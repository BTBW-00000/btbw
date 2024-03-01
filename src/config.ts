import { AppConfig } from "./token";


const name = '獣型生体兵器改造プロセス';
const iconURL = 'https://nsfwmisskey.narazaka.net/files/8236a278-478f-46d7-b6ec-d94098ab644c';
const callbackURL = document.location.href;
const permissions = [
  'read:account',  // アカウントの情報を見る
  'write:account',  // アカウントの情報を変更する
  // 'read:blocks',  // ブロックを見る
  // 'write:blocks',  // ブロックを操作する
  'read:drive',  // ドライブを見る
  'write:drive',  // ドライブを操作する
  // 'read:favorites',  // お気に入りを見る
  // 'write:favorites',  // お気に入りを操作する
  // 'read:following',  // フォローの情報を見る
  // 'write:following',  // フォロー・フォロー解除する
  // 'read:messaging',  // チャットを見る
  // 'write:messaging',  // チャットを操作する
  // 'read:mutes',  // ミュートを見る
  // 'write:mutes',  // ミュートを操作する
  'write:notes',  // ノートを作成・削除する
  // 'read:notifications',  // 通知を見る
  // 'write:notifications',  // 通知を操作する
  // 'read:reactions',  // リアクションを見る
  // 'write:reactions',  // リアクションを操作する
  // 'write:votes',  // 投票する
  // 'read:pages',  // ページを見る
  // 'write:pages',  // ページを操作する
  // 'write:page-likes',  // ページのいいねを操作する
  // 'read:page-likes',  // ページのいいねを見る
  // 'read:user-groups',  // ユーザーグループを見る
  // 'write:user-groups',  // ユーザーグループを操作する
  // 'read:channels',  // チャンネルを見る
  // 'write:channels',  // チャンネルを操作する
  // 'read:gallery',  // ギャラリーを見る
  // 'write:gallery',  // ギャラリーを操作する
  // 'read:gallery-likes',  // ギャラリーのいいねを見る
  // 'write:gallery-likes',  // ギャラリーのいいねを操作する
  // 'read:flash',  // Playを見る
  // 'write:flash',  // Playを操作する
  // 'read:flash-likes',  // Playのいいねを見る
  // 'write:flash-likes',  // Playのいいねを操作する
].join(',');


export const config: AppConfig = {
    name,
    iconURL,
    callbackURL,
    permissions,
};
