import { api } from "misskey-js";
import { config } from "./config";
import { TokenManager } from "./token";
import { ResourceManager } from "./resource";
import { createJackedText, createJackedText2, createProfileText, createProgressText, createRejackedText, createRewardText, createTrapText as createLinkText } from "./text";
import "./style.css";


const origin = 'https://nsfwmisskey.narazaka.net';
const iconURL = 'https://cdn.discordapp.com/attachments/900970809164701718/1209855258608541797/face_tp.png?ex=65f1ab03&is=65df3603&hm=94af323ce477d06da0f97e180a0f14503b823307dbfb67ba342b76fae80884e4&';
const bannerURL = 'https://cdn.discordapp.com/attachments/900970809164701718/1209855258927562822/banner_center.png?ex=65f1ab03&is=65df3603&hm=d6ae44511aef5a1c4721437e10d45d61169e8e71b57b5d08d51e63f2a75cde3e&';

const btJack = document.getElementById('btJack') as HTMLButtonElement;


window.addEventListener('load', async () => {
  const token = await TokenManager.getToken(origin);
  const isJacked = await alreadyJacked(origin);
  btJack.innerText =
    token == null ? 'ニゲラレナイ' :
      isJacked ? '侵入者ヲ捜索スル' :
        '乗ッ取ラレル';
  btJack.classList.remove('hide');
});


btJack.addEventListener('click', async () => {
  try {
    const url = new URL(document.location.href);
    const noteId = url.searchParams.get('noteid');
    btJack.disabled = true;
    await jack(origin, noteId);
  } catch (e: any) {
    alert(e);
  } finally {
    btJack.disabled = false;
  }
});


window.addEventListener('keydown', (ev) => {
  if (ev.key == 'Delete' && confirm('tokenを削除します')) {
    TokenManager.deleteToken(origin);
  }
});


const hash = (alphaNumeric: string) => {
  // [ascii] '0': 48, '9': 57, 'A': 65, 'Z': 90
  return alphaNumeric.split('').reverse()
    .map(x => x.toUpperCase().charCodeAt(0))
    .map(x => x <= 57 ? x - 48 : x - 55)
    .reduce((s, x, i) => s + (x * Math.pow(36, i)), 0);
};


const createName = (id: string) => {
  return `BTBW-${hash(id).toString().slice(0, 5)}`;
}


const alreadyJacked = async (origin: string) => {
  const token = await TokenManager.getToken(origin);
  if (token == null) {
    return false;
  }

  const client = new api.APIClient({
    origin: origin,
    credential: token,
  });

  try {
    console.debug('改造前アカウント情報取得');
    const profile = await client.request('i', {});
    const oldName = profile.name;
    const newName = createName(profile.id);

    return oldName === newName;
  } catch (e: any) {
    // FIXME try-catchをするのはここだけじゃダメ
    if (e.code === 'AUTHENTICATION_FAILED') {
      console.warn('無効なtokenを削除');
      TokenManager.deleteToken(origin);
    }
  }
};


const jack = async (origin: string, clickedNoteId: string | null) => {
  const token = await TokenManager.getToken(origin);
  if (token == null) {
    TokenManager.requestPermission(origin, config);
    return;
  }

  const client = new api.APIClient({
    origin: origin,
    credential: token,
  });
  const resourceManager = new ResourceManager(client);

  // 改造前アカウント情報
  console.debug('改造前アカウント情報取得');
  const profile = await client.request('i', {});
  const oldName = profile.name ?? '[deleted]';
  const newName = createName(profile.id);

  const alreadyJacked = oldName === newName;

  // 画像のアップロード
  console.debug('画像のアップロード');
  const folderId = await resourceManager.createFolderIfNotExists('獣型生体兵器');
  const iconFile = await resourceManager.uploadFileIfNotExists('icon', folderId, iconURL, '獣型生体兵器改造プロセスによって登録されたアイコン画像', true);
  const bannerFile = await resourceManager.uploadFileIfNotExists('banner', folderId, bannerURL, '獣型生体兵器改造プロセスによって登録されたバナー画像', true);

  // 改造ノート
  if (!alreadyJacked) {
    console.debug('改造ノート投稿');
    const progressNote = await client.request('notes/create', {
      text: createProgressText(newName),
      // ---- DEBUG ----
      visibility: 'specified',
      visibleUserIds: [],
      localOnly: true,
    });
  }

  // プロフ変更
  console.debug('プロフ変更');
  const response = await client.request('i/update', {
    name: newName,
    description: createProfileText(oldName, newName),
    location: `監視区域`,
    avatarId: iconFile.id,
    bannerId: bannerFile.id,
    fields: [
      {
        name: '改造素体',
        value: oldName,
      },
      {
        name: '強制発情',
        value: '常時',
      },
      {
        name: '絶頂',
        value: '禁止',
      }
    ],
  });

  // プロフ乗っ取りノート
  console.debug('プロフ乗っ取りノート投稿');
  const jackedNote = await client.request('notes/create', {
    cw: alreadyJacked ? createRejackedText() : createJackedText(),
    text: createJackedText2(),
  });
  // リンクノート
  console.debug('リンクノート投稿');
  const linkNote = await client.request('notes/create', {
    text: createLinkText(jackedNote.createdNote.id),
  });
  console.debug('ノートピン止め');
  const pinnedResponse = await client.request('i/pin', {
    noteId: linkNote.createdNote.id,
  });

  // 報酬ノート
  if (clickedNoteId != null && !alreadyJacked) {
    console.debug('報酬ノート投稿');
    const clickedNote = await client.request('notes/show', {
      noteId: clickedNoteId,
    });
    // URLを書き換えられて無関係なノートに返信しないように
    if (clickedNote.tags?.includes('獣型生体兵器')) {
      const rewardNote = await client.request('notes/create', {
        text: createRewardText(clickedNote.userId, oldName, newName),
        replyId: clickedNote.id,
      });
    }
  }

  document.location.href = origin + '/notes/' + jackedNote.createdNote.id;
};
