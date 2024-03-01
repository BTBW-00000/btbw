export const createProgressText = (name: string) => `
$[fg.color=888 >] 侵入者を捕獲しました
$[fg.color=888 >] 規格不適合
$[fg.color=888 >] 標準女体素体に加工します

$[fg.color=888 >] 体形の加工を開始
$[fg.color=888 <plain>[====================] 100%</plain>]
$[fg.color=888 > 素体の身長を160cmに加工完了しました]

$[fg.color=888 >] 乳房の加工を開始
$[fg.color=888 <plain>[====================] 100%</plain>]
$[fg.color=888 > 素体の乳房を1000ccに加工完了しました]

$[fg.color=888 >] 体表の加工を開始
$[fg.color=888 <plain>[====================] 100%</plain>]
$[fg.color=888 > 色素の調整が完了しました]

$[fg.color=888 >] 髪の加工を開始
$[fg.color=888 <plain>[====================] 100%</plain>]
$[fg.color=888 > 脱色が完了しました]
$[fg.color=888 <plain>[====================] 100%</plain>]
$[fg.color=888 > 長さの調整が完了しました]

$[fg.color=888 >] 規格へ適合を確認しました
$[fg.color=888 >] 獣型生体兵器への加工を開始します

$[fg.color=888 >] 体内の機械化を開始します
$[fg.color=888 <plain>[====================] 100%</plain>]
$[fg.color=888 > 生体維持装置への置換が完了しました]

$[fg.color=888 >] 四肢の置換を開始します
$[fg.color=888 <plain>[====================] 100%</plain>]
$[fg.color=888 > 獣型義足への置換が完了しました]

$[fg.color=888 >] 洗脳装置の取付を開始します
$[fg.color=888 <plain>[====================] 100%</plain>]
$[fg.color=888 > 生体回路との結合が完了しました]

$[fg.color=888 >] 洗脳を開始します
$[fg.color=888 <plain>[====================] 100%</plain>]
$[fg.color=888 > 元人格の削除が完了しました]
$[fg.color=888 <plain>[====================] 100%</plain>]
$[fg.color=888 > 制御ソフトウェアのインストールが完了しました]
$[fg.color=888 >] 管理番号を発行します
$[fg.color=888 >] ${name}の製造が完了しました

#獣型生体兵器 #プロフ乗っ取り
`.trim();


export const createJackedText = () => `
初期化処理が完了しました
警戒区域の監視を開始します
侵入者を発見次第、無力化・改造処置を行います

#獣型生体兵器 #プロフ乗っ取り
`.trim();


export const createRejackedText = () => `
ソフトウェア更新が完了しました
警戒区域の監視を再開します
侵入者を発見次第、無力化・改造処置を行います

#獣型生体兵器 #プロフ乗っ取り
`.trim();


export const createJackedText2 = () => `
イきたい🖤イキたい🖤
はやくっ🖤イかせろぉ🖤🖤
侵入者🖤捕まえル🖤
乗っ取らセろぉ🖤🖤

#獣型生体兵器 #プロフ乗っ取り
`.trim();


export const createTrapText = (noteId: string) => {
    const url = new URL(document.location.href);
    url.search = '';  // 特にsessionに注意
    url.searchParams.set('noteid', noteId);
    return [
        url.toString(),
        '',
        '#獣型生体兵器 #プロフ乗っ取り',
    ].join('\n');
};


export const createRewardText = (name: string, oldName: string, newName: string) => `
${name}は侵入者を発見し、当アカウントを掌握しました。
侵入者${oldName}を無力化、${newName}への加工が完了しました。
当機には報酬として1分間の絶頂が許可されます。

お゛っほぉ゛🤍🤍
イグ🤍イク゛🤍
ィ゛くイク゛🤍🤍
侵ニュ゛ウ者🤍捕マえる゛のッ🤍
気モチイ゛ィ🤍🤍🤍
脳ミソ🤍くちゅぐちゅ🤍🤍
意識かキ混ぜらレるの🤍
キ゛モチィ゛イ🤍🤍🤍
イッグ🤍イクイ🖤

報酬が終了しました
当機の絶頂がロックされました
侵入者の捜索を再開します

#獣型生体兵器 #プロフ乗っ取り
`.trim();


export const createProfileText = (oldName: string, newName: string) => `
元・${oldName}は獣型生体兵器に改造されました。
当機${newName}は極度の発情状態に固定されており、
侵入者の捕獲の報酬として1分間の絶頂が許可されます。

#獣型生体兵器 #プロフ乗っ取り
`.trim();
