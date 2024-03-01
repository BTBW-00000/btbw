export interface AppConfig {
  name?: string | null | undefined;
  iconURL: string | null | undefined;
  callbackURL: string;
  permissions: string;
}


export class TokenManager {
  static readonly STORAGE_KEY_TOKEN = 'TOKEN';

  static #setTokenToStorage(origin: string, token: string | null) {
    // 本来はここに保存するべきではない
    const obj = JSON.parse(localStorage.getItem(TokenManager.STORAGE_KEY_TOKEN) ?? '{}');
    if (token != null) {
      obj[origin] = token;
    } else {
      delete obj[origin];
    }
    localStorage.setItem(TokenManager.STORAGE_KEY_TOKEN, JSON.stringify(obj));
  }

  static #getTokenFromStorage(origin: string) {
    const obj = JSON.parse(localStorage.getItem(TokenManager.STORAGE_KEY_TOKEN) ?? '{}');
    return obj[origin] as string | null;
  }

  static async #requestToken(origin: string, sessionId: string) {
    const url = new URL(`${origin}/api/miauth/${sessionId}/check`);
    const response = await fetch(url, {
      method: 'POST',
    });
    const json = await response.json();
    // console.log(json);

    if (!json.ok) {
      return false;
    }

    const token = json.token;
    TokenManager.#setTokenToStorage(origin, token)
    return true;
  }
  
  static #moveToMiAuthForm(origin: string, appConfig: AppConfig) {
    const sessionId = crypto.randomUUID();
    const url = new URL(`${origin}/miauth/${sessionId}`);
    const addParam = (key: string, value: string | null | undefined) => {
      if (value != null) {
        url.searchParams.set(key, value);
      }
    };
    addParam('name', appConfig.name);
    addParam('icon', appConfig.iconURL);
    addParam('callback', appConfig.callbackURL);
    addParam('permission', appConfig.permissions);

    window.location.href = url.toString();
  }

  static requestPermission(origin: string, appConfig: AppConfig) {
    this.#moveToMiAuthForm(origin, appConfig);
  }

  static async getToken(origin: string) {
    // 既にtokenを保存した後
    {
      const token = this.#getTokenFromStorage(origin);
      if (token != null) {
        return token;
      }
    }
    // 権限を許可した直後
    {
      const url = new URL(document.location.href);
      const sessionId = url.searchParams.get('session');
      if (sessionId != null) {
        const url = new URL(document.location.href);
        url.searchParams.delete('session');
        history.replaceState(null, '', url);

        const ok = await this.#requestToken(origin, sessionId);
        if (ok) {
          return this.#getTokenFromStorage(origin) as string;
        }
        return null;
      }
    }
    {
      return null;
    }
  }

  static async deleteToken(origin: string) {
    this.#setTokenToStorage(origin, null);
  }
}
