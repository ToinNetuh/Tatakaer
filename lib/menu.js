const fs = require('fs-extra')
const { 
    prefix
} = JSON.parse(fs.readFileSync('./settings/setting.json'))

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textTnC = () => {
    return `
Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan Javascript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.

`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textMenu = (pushname) => {
    return `
_Oiin *${pushname}!*_


Aqui estão alguns dos recursos deste bot! ✨ \n Esperamos que com este Toin Bot todos vocês possam ser ajudados. \n_A felicidade dos outros é mais valiosa do que a própria felicidade ._
*<<<=======================>>>*   
╠➥ *${prefix}sticker*
╠➥ *${prefix}sticker nobg*
╠➥ *${prefix}ping*
╠➥ *${prefix}stickergif*
╠➥ *${prefix}stickergiphy*
╠➥ *${prefix}toimg*
╠➥ *${prefix}meme*
╠➥ *${prefix}nulis*
╠➥ *${prefix}quotemaker*
╠➥ *${prefix}rate*
╠➥ *${prefix}kapan*
╠➥ *${prefix}apakah*
╠➥ *${prefix}bisakah*
╠➥ *${prefix}infosurah*
╠➥ *${prefix}tafsir*
╠➥ *${prefix}ALaudio*
╠➥ *${prefix}katakasar*
╠➥ *${prefix}klasmen*
╠➥ *${prefix}artinama*
╠➥ *${prefix}cekjodoh*
╠➥ *${prefix}game*
╠➥ *${prefix}howgay*
╠➥ *${prefix}images*
╠➥ *${prefix}sreddit*
╠➥ *${prefix}resep*
╠➥ *${prefix}wiki*
╠➥ *${prefix}cuaca*
╠➥ *${prefix}chord*
╠➥ *${prefix}lirik*
╠➥ *${prefix}movie*
╠➥ *${prefix}wait*
╠➥ *${prefix}aiquote*
╠➥ *${prefix}doggo*
╠➥ *${prefix}fakta*
╠➥ *${prefix}katabijak*
╠➥ *${prefix}quote*
╠➥ *${prefix}puisi*
╠➥ *${prefix}anime*
╠➥ *${prefix}kpop*
╠➥ *${prefix}memes*
╠➥ *${prefix}tts*
╠➥ *${prefix}resi*
╠➥ *${prefix}covidindo*
╠➥ *${prefix}shortlink*
╠➥ *${prefix}zeusfont*
╠➥ *${prefix}linkgrup*
╠➥ *${prefix}adminList*
╠➥ *${prefix}ownergrup*
╠➥ *${prefix}me*
╠➥ *${prefix}listban*
╠➥ *${prefix}listblock*
╠➥ *${prefix}groupinfo*
╠➥ *${prefix}dewabatch*
╠➥ *${prefix}howmuch*
╠➥ *${prefix}mtk*
╠➥ *${prefix}google*
╠➥ *${prefix}ptl*
╠➥ *${prefix}grupbot*
╠➥ *${prefix}read*
╠➥ *${prefix}getpic*
╠➥ *${prefix}santet*
╠➥ *${prefix}saylist*
╠➥ *${prefix}addsay*
╠➥ *${prefix}say*
╠➥ *${prefix}delsay*
╠➥ *${prefix}listbacot*
╠➥ *${prefix}addbacot*
╠➥ *${prefix}bacot*
╠➥ *${prefix}delbacot*
╠➥ *${prefix}jadian*
╠➥ *${prefix}mystat*
╠➥ *${prefix}kbbi*
╠➥ *${prefix}logopornhub*
╠➥ *${prefix}infobmkg*
╠➥ *${prefix}bucin*
╠➥ *${prefix}rhug*
╠➥ *${prefix}slap*
╠➥ *${prefix}waifu*
╠➥ *${prefix}nsfwgif*
╠➥ *${prefix}bjgif*
╠➥ *${prefix}cumgif*
╠➥ *${prefix}kissgif*
╠➥ *${prefix}rhentai*
╠➥ *${prefix}infogempa*
╠➥ *${prefix}bjanime*
╠➥ *${prefix}baka*
╠➥ *${prefix}animeavatar*
╠➥ *${prefix}neko*
╠➥ *${prefix}wallpaper*
╠➥ *${prefix}wallpaper2*
╠➥ *${prefix}wpanime*
╠➥ *${prefix}ameliandani*
╠➥ *${prefix}pictcogan*
╠➥ *${prefix}pictcecan*
╠➥ *${prefix}aesthetic*
╠➥ *${prefix}donasi*
╠➥ *${prefix}motivasi*
╠➥ *${prefix}fakboy*
╠➥ *${prefix}botstat*
╠➥ *${prefix}ownerbot*
╠➥ *${prefix}join*
╠➥ *${prefix}ban* - banned
╠➥ *${prefix}bc* - promosi
╠➥ *${prefix}leaveall*
╠➥ *${prefix}clearall*
╠➥ *${prefix}setstatus*
╠➥ *${prefix}setpic*
╠➥ *${prefix}msc*
╠➥ *${prefix}screen*
╠➥ *${prefix}add*
╠➥ *${prefix}kick* @tag
╠➥ *${prefix}promote* @tag
╠➥ *${prefix}demote* @tag
╠➥ *${prefix}tagall*
╠➥ *${prefix}del*
╠➥ *${prefix}mutegrup*
╠➥ *${prefix}setprofile*
╠➥ *${prefix}revoke*
╠➥ *${prefix}setgroupname*
╠➥ *${prefix}resend*
╠➥ *${prefix}18+*
╠➥ *${prefix}18+2*
╠➥ *${prefix}antilink* 
╠➥ *${prefix}edotensei*
╠➥ *${prefix}kickall*
╠➥ *${prefix}fb*
╠➥ *${prefix}logoml*
╠➥ *${prefix}kpop*
╠➥ *${prefix}sandwriting*
╠➥ *${prefix}tiktokpic*
╠➥ *${prefix}tahta*
╠➥ *${prefix}artimimpi*
╠➥ *${prefix}family100*
╠➥ *${prefix}playstore*
╠➥ *${prefix}shopee*
╠➥ *${prefix}kusonime*
╠➥ *${prefix}glitch*
╠➥ *${prefix}distance*
╠➥ *${prefix}citacita*
╠➥ *${prefix}emojisticker*
╠➥ *${prefix}jadwalbola*
╠➥ *${prefix}caklontong*
╠➥ *${prefix}tebakgambar*
╠➥ *${prefix}tiktok*
╠➥ *${prefix}asupan*
╠➥ *${prefix}thundertext*
╠➥ *${prefix}slidingtext*
╠➥ *${prefix}glowtext*
╠➥ *${prefix}romancetext*
╠➥ *${prefix}silktext*
╠➥ *${prefix}partytext*
╠➥ *${prefix}kutuk*
╠➥ *${prefix}stickertext*
╠➥ *${prefix}hartatahta*
╠➥ *${prefix}mascotlogo*
╠➥ *${prefix}lovetext*
╠➥ *${prefix}ytmp3*
╠➥ *${prefix}nulis2*
╠➥ *${prefix}lion*
╠➥ *${prefix}wolf2*
╠➥ *${prefix}ytmp4*
╠➥ *${prefix}wolf*
╠➥ *${prefix}mapz*
╠➥ *${prefix}alkitab*
╠➥ *${prefix}marvel*
╠➥ *${prefix}twitter*
╠➥ *${prefix}ssweb*
╠➥ *${prefix}gsmarena*
╠➥ *${prefix}stalktik*
╠➥ *${prefix}quotesen*
╠➥ *${prefix}logoff*
╠➥ *${prefix}spamcall*
╠➥ *${prefix}spamcall2*
╠➥ *${prefix}qrcode*
╠➥ *${prefix}qrread*
╠➥ *${prefix}koin*
╠➥ *${prefix}dadu*
╠➥ *${prefix}blackpink*
╠➥ *${prefix}galaxytext*
╠➥ *${prefix}tomp3*
╠➥ *${prefix}detail*
╠➥ *${prefix}nhpdf*
╠➥ *${prefix}fml*
╠➥ *${prefix}infoalamat*
╠➥ *${prefix}ttp2*
╠➥ *${prefix}pastebin*
╠➥ *${prefix}silk*
╠➥ *${prefix}neonime*
╠➥ *${prefix}pinterest*
╠➥ *${prefix}nhview*
╠➥ *${prefix}nhder*
╠➥ *${prefix}maluser*
╠➥ *${prefix}malcharacter*
╠➥ *${prefix}newstickerline*
╠➥ *${prefix}news*
╠➥ *${prefix}ssphone*
╠➥ *${prefix}bitly*
╠➥ *${prefix}tinyurl*
╠➥ *${prefix}heroml*
╠➥ *${prefix}nomorhoki*
╠➥ *${prefix}twitterstalk*
╠➥ *${prefix}checkip*
╠➥ *${prefix}sspc*
╠➥ *${prefix}imgtourl*
╠➥ *${prefix}myzodiak*
╠➥ *${prefix}missing*
╠➥ *${prefix}stalktwit*
╠➥ *${prefix}findsticker*
╠➥ *${prefix}memeindo*
╠➥ *${prefix}darkjokes*
╠➥ *${prefix}joox*
╠➥ *${prefix}goldpb*
╠➥ *${prefix}silverpb*
╠➥ *${prefix}stickmatrix*
╠➥ *${prefix}stickdarcula*
╠➥ *${prefix}sticklava*
╠➥ *${prefix}stickequal*
╠➥ *${prefix}darkjokes*
╠➥ *${prefix}stickgaming*
╠➥ *${prefix}stickmetal*
╠➥ *${prefix}randomstiker*
╠➥ *${prefix}textjoker*
╠➥ *${prefix}textgplay*
╠➥ *${prefix}textgplay*
╠➥ *${prefix}quotesgambar*
╠➥ *${prefix}stikerhentai*
╠➥ *${prefix}fotocewek*
╠➥ *${prefix}fancytext*
╠➥ *${prefix}ceksange*
╠➥ *${prefix}wa.me*
╠➥ *${prefix}infonomor*
╠➥ *${prefix}stikerbokep*
╠➥ *${prefix}randomgif*
╠➥ *${prefix}giphysticker*
╠➥ *${prefix}patrickgif*
╠➥ *${prefix}infogempa*
╠➥ *${prefix}infoloker*
╠➥ *${prefix}github*
╠➥ *${prefix}trendtwit*
╠➥ *${prefix}filmapik*
╠➥ *${prefix}lagu*
╠➥ *${prefix}textwhite*
╠➥ *${prefix}textsummer*
╠➥ *${prefix}textfoil*
╠➥ *${prefix}textamerika*
╠➥ *${prefix}moddroid*
╠➥ *${prefix}happymod*
╠➥ *${prefix}bot*
╠➥ *${prefix}fucklife*
╠➥ *${prefix}images2*
╠➥ *${prefix}brainly*
╠➥ *${prefix}textgrafiti*
╠➥ *${prefix}cnn*
╠➥ *${prefix}bucin2*
╠➥ *${prefix}iri*
╠➥ *${prefix}antivirtex*
╠➥ *${prefix}cekjodoh2*
╠➥ *${prefix}lirik2*
╠➥ *${prefix}jadwaltvnow*
╠➥ *${prefix}jadwaltv*
╠➥ *${prefix}emojiimg*
╠➥ *${prefix}quotesen*
╠➥ *${prefix}weather*
╠➥ *${prefix}harijadi*
╠➥ *${prefix}spamsms*
╠➥ *${prefix}spamgmail*
╠➥ *${prefix}brainly2*
╠➥ *${prefix}listnekopoi*
╠➥ *${prefix}javcosplay*
╠➥ *${prefix}covid19*
╠➥ *${prefix}nekopoinew*
╠➥ *${prefix}infotogel*
╠➥ *${prefix}bot2*
╠➥ *${prefix}bot3*
╠➥ *${prefix}iplocation*
╠➥ *${prefix}convertduit*
╠➥ *${prefix}matauang*
╠➥ *${prefix}kusonime2*
╠➥ *${prefix}nulis3*
╠➥ *${prefix}nulis4*
╠➥ *${prefix}nulis5*
╠➥ *${prefix}nulis6*
╠➥ *${prefix}filmapikdownload*
╠➥ *${prefix}virgintext*
╠➥ *${prefix}googletext*
╠➥ *${prefix}textmetal*
╠➥ *${prefix}textwater*
╠➥ *${prefix}artinama2*
╠➥ *${prefix}katailham*
╠➥ *${prefix}katadilan*
╠➥ *${prefix}katahacker*
╠➥ *${prefix}kodenegara*
╠➥ *${prefix}textkopi*
╠➥ *${prefix}textpubg*
╠➥ *${prefix}textwarface*
╠➥ *${prefix}textkayu*
╠➥ *${prefix}katacinta*
╠➥ *${prefix}textcsgo*
╠➥ *${prefix}textcros*
╠➥ *${prefix}zeusimg*
╠➥ *${prefix}keytext*
╠➥ *${prefix}zeusff*
╠➥ *${prefix}cersex*
╠➥ *${prefix}covidword*
╠➥ *${prefix}flowertext*
╠➥ *${prefix}googlesearch*
╠➥ *${prefix}slot*
╠➥ *${prefix}zeusback*
╠➥ *${prefix}hitunghuruf*
╠➥ *${prefix}wikien*
╠➥ *${prefix}katazeus*
╠➥ *${prefix}listhentai*
╠➥ *${prefix}japanxxx*
╠➥ *${prefix}koreaxxx*
╠➥ *${prefix}indoxxx*
*<<<=======================>>>*
`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textDonasi = () => {
    return `
Olá, obrigado por usar este bot, não precisa doar, mano, este bot é gratuito ...
Apenas reze para que este projeto de bot continue crescendo
Reze para que o autor do bot tenha ideias mais criativas, mas se você quiser doar, tudo bem mano para o desenvolvimento deste bot ...
Se quiser doar, é só entrar em contato com o proprietário. Você pode via crédito e GoPay, basta se inscrever no meu canal ..
ajude a compartilhar para que muitas pessoas por aí aproveitem este bot.

Obrigado. ~Toin`
}

exports.textLoker = () => {
    return `
"perusahaan": "PT Exel Integrasi Solusindo",\n 
      "link": "https://m.karir.com/opportunities/1301913",\n 
      "profesi": "Sales Business Representative",\n 
      "gaji": "IDR 4.000.000 - 7.000.000",\n 
      "lokasi": "head office - Jakarta Barat",\n 
      "pengalaman": "Setidaknya 2 tahun",\n
      "jobFunction": "Penjualan dan Pemasaran",\n 
      "levelKarir": "Pemula / Staf",\n 
      "edukasi": "Sarjana/S1",\n 
      "desc": "Job Qualification:\u00a0Bachelor or Master degree.Have a quantitative skills and negotiation skill.Responsible for Sales, Business Development, and also Revenue Stream efforts for our company, seeking, overseeing and managing new potential clients.Tasks will include research into new opportunities and markets, updating and maintaining an organised clients of business development and marketing materials.Write, prepare, layout and produce qualifications and proposals, presentation materials upon deadlines.First point of contact for new potential client, collaborators and partners, and to evaluate and pursue new potential projects.Responsible for managing business and marketing on a day-to-day basis, organize and overseeing workflow.",\n 
      "syarat": "Requirements:Female, 18-25 years old.Bachelor or Master DegreePassionate in music industry.Fluently in English.Have a quantitative and negotiation skills.Comfortable working with team, evaluating the data, and applying creative techniques to business problems"\n\nBy : Zeus`
}
