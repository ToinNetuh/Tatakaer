require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-automate')

const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const axios = require('axios')
const os = require('os')
const speed = require('performance-now')
const fetch = require('node-fetch')
const translatte = require('translatte')
const bent = require('bent')
const request = require('request-promise')
const emojiUnicode = require('emoji-unicode')
const get = require('got')

const appRoot = require('app-root-path')
const low = require('lowdb')
const google = require('google-it')
const { stdout, aruga } = require('process');
const Math_js = require('mathjs')
const FileSync = require('lowdb/adapters/FileSync')
const db_group = new FileSync(appRoot+'/lib/data/group.json')
const db = low(db_group)
db.defaults({ group: []}).write()

const { 
    removeBackgroundFromImageBase64
} = require('remove.bg')

const {
    exec
} = require('child_process')

const { 
    menuId, 
    cekResi, 
    urlShortener, 
    meme, 
    translate, 
    getLocationData,
    images,
    resep,
    rugapoi,
    rugaapi,
    cariKasar,
    downloader
} = require('./lib')


const {
    stickerburn,
    stickerlight
    } = require('./lib/sticker')

const { 
    msgFilter, 
    color, 
    processTime, 
    isUrl,
	download
} = require('./utils')


const { 
    uploadImages,
    custom,
    picturemis
 } = require('./utils/fetcher')

const fs = require('fs-extra')
const { index } = require('mathjs')
const banned = JSON.parse(fs.readFileSync('./settings/banned.json'))
const simi = JSON.parse(fs.readFileSync('./settings/simi.json'))
const ngegas = JSON.parse(fs.readFileSync('./settings/ngegas.json'))
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))

let dbcot = JSON.parse(fs.readFileSync('./lib/database/bacot.json'))
let dsay = JSON.parse(fs.readFileSync('./lib/database/say.json'))
let _autostiker = JSON.parse(fs.readFileSync('./lib/helper/antisticker.json'))
let antilink = JSON.parse(fs.readFileSync('./lib/helper/antilink.json'))
let muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))


let { 
    ownerNumber, 
    groupLimit, 
    memberLimit,
    prefix,
    vhtearkey,
    keepSave,
    iTechApi,
    apiKey
} = setting

const {
    apiNoBg,
	apiSimi
} = JSON.parse(fs.readFileSync('./settings/api.json'))

function formatin(duit){
    let	reverse = duit.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const inArray = (needle, haystack) => {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(haystack[i].id == needle) return i;
    }
    return false;
}



const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'

module.exports = HandleMsg = async (aruga, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList, } = message
        let { body } = message
        var { name, formattedTitle, gcok} = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const botNumber = await aruga.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await aruga.getGroupAdmins(groupId) : ''
        const lvpc = Math.floor(Math.random() * 101) + 1
        const double = Math.floor(Math.random() * 2) + 1
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
		const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const pengirim = sender.id
        const serial = sender.id
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const blockNumber = await aruga.getBlockedIds()
        const groupMembers = isGroupMsg ? await aruga.getGroupMembersId(groupId) : ''
        const GroupLinkDetector = antilink.includes(chatId)
        const stickermsg = message.type === 'sticker'

        // Bot Prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const arg = body.trim().substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')
		const argx = chats.slice(0).trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const uaOverride = process.env.UserAgent
        const url = args.length !== 0 ? args[0] : ''
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
		
        // [IDENTIFY]
        const ownerNumber = "556296638900@c.us"
        const isOwnerBot = ownerNumber.includes(pengirim)
        const isOwner = ownerNumber.includes(pengirim)
        const isOwnerB = ownerNumber.includes(pengirim)
        const isBanned = banned.includes(pengirim)
		const isSimi = simi.includes(chatId)
		const isNgegas = ngegas.includes(chatId)
        const isKasar = await cariKasar(chats)
        const isAutoStikerOn = isGroupMsg ? _autostiker.includes(chat.id) : false
        const isImage = type === 'image'
        
        //
        if(!isCmd && isKasar && isGroupMsg) { console.log(color('[BADW]', 'orange'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        if (isCmd && !isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        
       /*// ANTI GRUPOS && ANTI PORNO
        if (isGroupMsg && isLeg && !isGroupAdmins && !isOwner){
            if (chats.match(/(https?:\/\/chat.whatsapp.com)/gi)) {
				console.log('Verificando o link de grupo recebido.')
                const check = await aruga.inviteInfo(chats)
                if (check.status == 200) {
                    aruga.removeParticipant(groupId, sender.id)
					console.log('Era link real então removi o ' + sender.id)
                } else {
                    console.log('Link de grupo recebido! Mas é falso, não representa ameaças')
                }
			} else if (chats.match(/\bhttps?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)) {
				const chatpn = chats.match(/\bhttps?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)
				const flnrl = new URL(chatpn)
				console.log('Verificando se há pornografia no link recebido...\n' + flnrl)
				isPorn(flnrl.hostname, function(error, status) {
					if (status == true) {
						aruga.removeParticipant(groupId, sender.id)
						console.log('Tinha pornografia então removi o ' + sender.id)
					}
				})
			}
		} else {
            if (chats.match(/(https?:\/\/chat.whatsapp.com)/gi)) {
				console.log('Link de grupo recebido, mas foi por alguém da White List ou no PV.')
			}
        }*/
        // ANTI FLOOD PRIVADO
        /*if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) {
            await aruga.reply(from, 'calmaer pera 10 segundos antes de usar outro comando', id)
            return console.log(color('FLOOD AS', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'de', color(pushname))
            }
            
            
            // ANTI FLOOD GRUPOS
            if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) {
            await aruga.reply(from, 'calmaer pera 10 segundos antes de usar outro comando', id)
            return console.log(color('FLOOD AS', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'de', color(pushname), 'em', color(name || formattedTitle))
            }
        
            // Impede SPAM
        msgFilter.addFilter(from)*/

      

 if (chats == 'Assalamualaikum'){
          aruga.reply(from, 'Waalaikumsalam wr wb.', id)
      }
      if (chats == 'assalamualaikum'){
          aruga.reply(from, 'Waalaikumsalam wr wb.', id)
      }
      if (chats == 'Terimakasih'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'terimakasih'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'Makasih'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'tq'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'tengkyu'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'Tengkyu'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'Tq'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'Terima kasih'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'terima kasih'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'Thx'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'thx'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'makasih'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'makasii'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'Makasii'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'makasi'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'Makasi'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'mks'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'Mks'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'mksi'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'Mksi'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'thanks'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'Thanks'){
          aruga.reply(from, 'Iya sama-sama..', id)
      }
      if (chats == 'toin'){
        aruga.sendPtt(from, './media/toin.mp3', id)
    }
    if (chats == 'Toin'){
        aruga.sendPtt(from, './media/toin.mp3', id)
    }
    if (chats == 'Tatakaer'){
        aruga.sendPtt(from, './media/tatakaer.mp3', id)
    }
    if (chats == 'tatakaer'){
        aruga.sendPtt(from, './media/tatakaer.mp3', id)
    }
    if (chats == 'TATAKAER'){
        aruga.sendPtt(from, './media/tatakaer.mp3', id)
    }
    if (chats == 'Tatakae'){
        aruga.sendPtt(from, './media/tatakaer.mp3', id)
    }
    if (chats == 'tatakae'){
        aruga.sendPtt(from, './media/tatakaer.mp3', id)
    }
    if (chats == 'TATAKAEE'){
        aruga.sendPtt(from, './media/tatakaer.mp3', id)
    }
      if (chats == 'P'){
          aruga.sendPtt(from, './media/nani-kore.mp3', id)
      }
      if (chats == 'p'){
          aruga.sendPtt(from, './media/nani-kore.mp3', id)
      }
      if (chats == 'oi'){
          aruga.sendPtt(from, './media/nani-kore.mp3', id)
      }
      if (chats == 'Oi'){
          aruga.sendPtt(from, './media/nani-kore.mp3', id)
      }
      if (chats == 'Bot'){
          aruga.sendPtt(from, './media/nani-kore.mp3', id)
      }
      if (chats == 'bot'){
          aruga.sendPtt(from, './media/nani-kore.mp3', id)
      }
      if (chats == 'kontol'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Kontol') {
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'bacot') {
          aruga.sendPtt(from, './media/song.mp3', id)
      }
      if (chats == 'kntl') {
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'ajg'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Ajg'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'oi?'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Oi?'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'tod'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Tod'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Ngentot'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Hai'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Tolol'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'ngentod'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Ngentod'){
          aruga.sendPtt(from, './media.astg.mp3', id)
      }
      if (chats == 'Anjg'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'anjg'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'jancok'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'coli'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Permisi'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'permisi'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Coli'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'kuntul'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Kuntul'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Burik'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'burik'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Jancok'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'ewe'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
     if (chats == '#rhentai'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == '#bjanime'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == '#bjgif'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == '#18+'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Ewe'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == '#18+2'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == '#stikerbokep'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == '#nsfwgif'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == '#cumgif'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'anjing'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Anjing'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Hi'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Hay'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'hay'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'hi'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Halo'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Tes'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'tes'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'halo'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Kak'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'kak'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'hi bot'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Halo bot'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Hallo bot'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'misi'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Misi'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Hii'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'hii'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'hallo bot'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Hi bot'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'punten'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Punten'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Toin?'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'gajelas'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Gajelas'){
          aruga.sendPtt(from, './media/bakaa.mp33', id)
      }
      if (chats == 'Bg'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'bg'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'woi'){
          aruga.sendPtt(from, './media/nani-kore.mp3', id)
      }
      if (chats == 'Woi'){
          aruga.sendPtt(from, './media/nani-kore.mp3', id)
      }
      if (chats == 'Asu'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'asu'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Asw'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'asw'){
          aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'Gblk'){
          aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'gblk'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'Goblok'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'goblok'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'Gblg'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'Bacot'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'bego'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'Bego'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'Tolol'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'tolol'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'bodo'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'Bodo'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'Hallo'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'hallo'){
        aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
       if (chats == 'pe'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'Pe'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'hy'){
        aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Hy'){
        aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'Bang'){
        aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'bang'){
        aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'hai'){
        aruga.sendPtt(from, './media/ohayou.mp3', id)
      }

        const mess = {
            wait: 'Calmaer Opoha Fazeno',
            error: {
                St: '[❗] Envie fotos com legendas **sticker* ou tags de imagem que já foram enviadas',
                Ti: '[❗] Repetir adesivo com legenda */stickertoimg* ou a etiqueta do adesivo que foi enviada',
                Qm: '[❗] Ocorreu um erro, talvez o tema naum esteja disponível!',
                Yt3: '[❗] Ocorreu um erro, naum foi possível converter para mp3!',
                Yt4: '[❗] Ocorreu um erro, talvez o erro tenha sido causado pelo sistema.',
                Ig: '[❗] Ocorreu um erro, talvez porque a conta seja privada',
                Ki: '[❗] O bot naum pode emitir pois naum e da administração!',
                Sp: '[❗] O bot naum pode registrar o administrador',
                Ow: '[❗] O bot não pode emitir o comando e apenas para o Toin',
                Bk: '[❗] O bot não consegue bloquear o proprietário ',
                Ad: '[❗] Incapaz de adicionar alvo, talvez porque é privado',
                Iv: '[❗] O link que você enviou não é válido!'
            }
        }
        
        const isMuted = (chatId) => {
          if(muted.includes(chatId)){
            return false
        }else{
            return true
            }
        }


        //fitur anti link
        if (isGroupMsg && GroupLinkDetector && !isGroupAdmins && !isOwner){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await aruga.inviteInfo(chats);
                if (!check) {
                    return
                } else {
                    aruga.reply(from, '*[Detector de links]*\nVocê enviou um link de bate-papo em grupo, desculpe, você será expulso do grupo em breve.\n\n~ToinBot', id).then(() => {
                        aruga.removeParticipant(groupId, sender.id)
                    })
                }
            }
        }
        
        
        
        if (isAutoStikerOn && isMedia && isImage) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await aruga.sendImageAsSticker(from, imageBase64)
                .then(async () => {
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                })
                .catch(async (err) => {
                    console.error(err)
                    await aruga.reply(from, `Error!\n${err}`, id)
                })
        }

        // Kerang Menu
        //BUAT NOMER CEGAN/CECAN, KALIAN BISA CUSTOM SENDIRI, MAKASEH!

        const cegan = [
            "https://i.ibb.co/JmVx5bJ/Cogan.jpg",
            "https://i.ibb.co/JmVx5bJ/Cogan.jpghttps://i.ibb.co/3pGT2PT/Cogan-1.jpg",
            "https://i.ibb.co/mSbzWBg/Boyfriend-material-cogan.jpg",
            "https://i.ibb.co/K29d94b/download-4.jpg",
            "https://i.ibb.co/L0Fxdsb/image.jpg",
            "https://i.ibb.co/9GYpqDt/lang2-4.jpg"
        ]
        const cecan = [
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/VT4ggGj/Instagram.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/x1nD1HD/Instagram-1.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/ZXPPFKF/Argumentasi-Dimensi.jpg",
            },
            {
            lahwoi : "Nih...",   
            imagex : "https://i.ibb.co/NpY5ZBR/image.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/PWsL6HF/download-1.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex :"https://i.ibb.co/JFkDWjB/RASANYA-ANJING-BANGET.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/5W2gMq6/download-2.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/QNWhdgC/download-3.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/RS1vWC3/Blur.jpg"
            }
        ]
        
        const estetek = [
            "https://i.ibb.co/Xk1kggV/Aesthetic-Wallpaper-for-Phone.jpg",
            "https://i.ibb.co/wBNyv8X/image.jpg",
            "https://i.ibb.co/hgcJbg7/Leaving-Facebook.jpg",
            "https://i.ibb.co/27TW3bT/Pinterest.jpg",
            "https://i.ibb.co/2MR16Ct/Image-about-vintage-in-ALittle-Bit-Of-This-And-That-by-Little-Nerdy-Gnome.jpg",
            "https://i.ibb.co/WfrzTWH/minteyroul-on-We-Heart-It.jpg",
            "https://i.ibb.co/dMpkfWT/1001-Kreative-Aesthetic-Wallpaper-Ideen-f-r-das-Handy.jpg",
            "https://i.ibb.co/cN3Br2J/red-grunge-wallpaper-dark-edgy-aesthetic-collage-background-trendy-cool-dark-red-iphone-wallpaper.jpg",
            "https://i.ibb.co/c8QMXZv/ee16de425985d4a1b628dddc1461b546.jpg"
        ]


	const apakah = [
            'Ya',
            'Tidak',
            'Ga tau'
            ]

        const bisakah = [
            'Bisa',
            'Tidak Bisa',
            'Ga tau'
            ]

        const kapan = [
            '1 Minggu lagi',
            '1 Bulan lagi',
            '1 Tahun lagi',
            '100 tahun lagi',
            'gatau',
            '2030',
            '1 Jam lagi',
            '1 Menit lagi'
            ]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]
 const santet = [
            'Muntah Paku',
            'Meninggoy',
            'Berak Paku',
            'Muntah Rambut',
            'Ketempelan MONYET!!!',
            'Berak di Celana Terus',
            'Menjadi Gila',
            'Menjadi manusiawi',
            'jomblo selamanya',
            'ga bisa berak',
            'ketiban pesawat',
            'jatuh dikamar mandi'    
            ]

        const kutuk = [
            'Sapi',
            'Batu',
            'Babi',
            'Anak soleh dan soleha',
            'pohon pisang',
            'janda',
            'bangsat',
            'buaya',
            'Jangkrik',
            'Kambbiingg',
            'Bajing',
            'kang seblak',
            'kang gorengan',
            'kang siomay',
            'badut ancol',
            'Tai',
            'Kebo',
            'Badak biar Asli',
            'tai kotok',
            'Bwebwek',
            'Orang Suksesss...... tapi boong',
            'Beban Keluarga' //tambahin  aja
            ]
          
      const sotoy = [
        '🍊 : 🍒 : 🍐',
        '🍒 : 🔔 : 🍊',
        '🍇 : 🍒 : 🍐',
        '🍊 : 🍋 : 🔔',
        '🔔 : 🍒 : 🍐',
        '🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',        
        '🍐 : 🍒 : 🍋',
        '🍐 : 🍐 : 🍐',
        '🍊 : 🍒 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🍌 : 🍒 : 🔔',
        '🍐 : 🔔 : 🔔',
        '🍊 : 🍋 : 🍒',
        '🍋 : 🍋 : 🍌',
        '🔔 : 🔔 : 🍇',
        '🔔 : 🍐 : 🍇',
        '🔔 : 🔔 : 🔔',
        '🍒 : 🍒 : 🍒',
        '🍌 : 🍌 : 🍌',
        '🍇 : 🍇 : 🍇',
        '🍊 : 🍒 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🍌 : 🍒 : 🔔',
        '🍐 : 🔔 : 🔔',
        '🍊 : 🍋 : 🍒',
        '🍋 : 🍋 : 🍌',
        '🔔 : 🔔 : 🍇',
        '🔔 : 🍐 : 🍇',
        '🍊 : 🍒 : 🍐',
        '🍒 : 🔔 : 🍊',
        '🍇 : 🍒 : 🍐',
        '🍊 : 🍋 : 🔔',
        '🔔 : 🍒 : 🍐',
        '🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',        
        '🍐 : 🍒 : 🍋'
        ]

    

	// Filter Banned People
        if (isBanned) {
            return console.log(color('[BAN]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        }

		
        switch (command) {
        // Menu and TnC
        case 'speed':
            case 'ping':
                const loadedMsg = await aruga.getAmountOfLoadedMessages()
                const chatIds = await aruga.getAllChatIds()
                const groups = await aruga.getAllGroups()
                const timestamp = speed();
                const latensi = speed() - timestamp
                const charged = await aruga.getIsPlugged();
                const device = await aruga.getMe() 
                const deviceinfo = `- Battery Level : ${device.battery}%\n  ├ Is Charging : ${charged}\n  └ 24 Hours Online : ${device.is24h}\n  ├ OS Version : ${device.phone.os_version}\n  └ Build Number : ${device.phone.os_build_number}\n\n _*Jam :*_ ${moment(t * 1000).format('HH:mm:ss')}`
                aruga.sendText(from, `*Device Info*\n${deviceinfo}\n\nPenggunaan RAM: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*\nCPU: *${os.cpus().length}*\n\nStatus :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *10376* Personal Chats\n- *${chatIds.length}* Total Chats\n\nSpeed: ${latensi.toFixed(4)} _Second_`)
                break
 case 'botstat': {
            const loadedMsg = await aruga.getAmountOfLoadedMessages()
            const charged = await aruga.getIsPlugged();
            const device = await aruga.getMe() 
            const deviceinfo = `- Battery Level : ${device.battery}%\n  ├ Is Charging : ${charged}\n  └ 24 Hours Online : ${device.is24h}\n  ├ OS Version : ${device.phone.os_version}\n  └ Build Number : ${device.phone.os_build_number}\n\n _*Jam :*_ ${moment(t * 1000).format('HH:mm:ss')}`   
            const chatIds = await aruga.getAllChatIds()
            const groups = await aruga.getAllGroups()
            const groupsIn = groups.filter(x => x.groupMetadata.participants.map(x => [botNumber, '6282139549692@c.us'].includes(x.id._serialized)).includes(true))
            aruga.sendText(from, `*Device Info*\n${deviceinfo}\n\nStatus :\n- *${loadedMsg}* Loaded Messages\n- *${groupsIn.length}* Group Joined\n- *${groups.length - groupsIn.length}* Groups Left\n- *${groups.length}* Group Chats\n- *10376* Personal Chats\n- *10353* Personal Chats Active\n- *${chatIds.length}* Total Chats\n- *${chatIds.length - groupsIn.length}* Total Chats Active`)
            break
        }
 case 'stickerbokep':
	 case 'stikerbokep':
	 aruga.reply(from, mess.wait, id)
	   const bokepi = ['https://i.ibb.co/8jRQ01J/IMG-20201205-223443-917.jpg','https://i.ibb.co/KKzmXzY/IMG-20201206-033352-192.jpg','https://i.ibb.co/8srYLFL/IMG-20201206-034512-690.jpg','https://i.ibb.co/B32Nq01/E0yui-GCvum-STqdm-G2-6-Os-FBJYMh2-Vd-Da4ayhip-Ub-B4-Xx-Cl-H7-Vt-Ju-j-J-s-Ri-A9kww-Q83-GFPnp-W9nl-Zva.jpg','https://i.ibb.co/9psS49T/Lvu-JQ8-Ut-AELo-AGZ0o-F9-RDQNk-W28e-QHj-CZPo-Ak-Wm2u-Rey-RAay-Ku-Ub4-f2-P-m-F6-DLdc67l-Ko-IRy-NZZIth.jpg','https://i.ibb.co/BVB8fbj/pv-NJ5-Ja4-VP1fl2-H0b4-Ad-YOzb-HOad-Tzq-JO9-Ms-Ecs-Qz-Sn7s-CMdem-SPv-QBj8qqrt5xk-GEW-o-HKAKs-NRp-GN6.jpg','https://i.ibb.co/BTFg7yT/IEsp-UDTc6-YFw-Hro-E3-Eq-VXGgo-PV8-4-Il4-HWy-Usc-Kw-JMVW4ql-WVBOSzmxjz6-W6r-Dw4-E2-GPo7cygc-HH6-XFy7.jpg','https://i.ibb.co/bsJfgz7/H3-GSk-Spdcw-Uc-E8t-Mk-A5-ZM6y-MO2-Kk-Fdp5qxr-E0ju-Y3-N-Dx-Ln-YWp-Epx2jug-DEFg-LAloq-1g5-NYr-A2tz-O4.jpg','https://i.ibb.co/KNsD0tT/pv-NJ5-Ja4-VP1fl2-H0b4-Ad-YOzb-HOad-Tzq-JO9-Ms-Ecs-Qz-Sn7s-CMdem-SPv-QBj8qqrt5xk-GEW-o-HKAKs-NRp-GN6.jpg','https://i.ibb.co/g6Fwp8S/pv-NJ5-Ja4-VP1fl2-H0b4-Ad-YOzb-HOad-Tzq-JO9-Ms-Ecs-Qz-Sn7s-CMdem-SPv-QBj8qqrt5xk-GEW-o-HKAKs-NRp-GN6.jpg','https://i.ibb.co/gPFMxr6/image.png','https://i.ibb.co/0YPwyVc/image.png','https://i.ibb.co/vCWZWQP/image.png','https://i.ibb.co/c66fNtR/image.png','https://i.ibb.co/XDB3nxX/image.png','https://i.ibb.co/s9dJRr1/image.png','https://i.ibb.co/tqXh4c7/image.png','https://i.ibb.co/ZBBxgqy/image.png','https://i.ibb.co/jWx7DHR/image.png','https://i.ibb.co/SRQ590w/image.png','https://i.ibb.co/CsL5XWy/image.png','https://i.ibb.co/zsSh5t8/image.png','https://i.ibb.co/L9M2pH4/image.png','https://i.ibb.co/q53mKTp/image.png','https://i.ibb.co/12myv6w/image.png','https://i.ibb.co/yhbnjtR/image.png']
	   let bokepio = bokepi[Math.floor(Math.random() * bokepi.length)]
		  aruga.sendStickerfromUrl(from, bokepio)
		   break

    case 'randomgif':
	case 'rgif':
	  aruga.reply(from, mess.wait, id)
	const giffo = ['https://c.tenor.com/wgX4i8giG9wAAAAj/mochi-peachcat-cat.gif','https://c.tenor.com/UUhe2fIowxAAAAAj/love-mochi.gif','https://media.tenor.com/images/800a46ca3a946f908b8a5c7cd2eabe35/tenor.gif','https://media.tenor.com/images/ebb65bb0ca7bdd155c198a066ecfcb92/tenor.gif','https://media.tenor.com/images/75b3c8eca95d917c650cd574b91db7f7/tenor.gif','https://media.tenor.com/images/492a250e5ac486d298ec88e71079eeb1/tenor.gif','https://media.tenor.com/images/6321fa6690d59b2f37c25ce0d271cb6c/tenor.gif','https://media.tenor.com/images/ec85a866a451e1a47008ac6a8534d1c4/tenor.gif','https://media.tenor.com/images/73b6bc522e27fcc81fcdbf7012bdd323/tenor.gif','https://media.tenor.com/images/e411846cebbe99eb56e42a4d188cf5ca/tenor.gif','https://media.tenor.com/images/b418cde4ddb9ed4a8548500048d3bafb/tenor.gif','https://media.tenor.com/images/a13ada2790e7e128cd87958c9d166073/tenor.gif','https://media.tenor.com/images/f2f20ce49f0ecc1c3315c146e737bdc9/tenor.gif','https://media.tenor.com/images/23bfa35425bcd3794bea802adb5b9bfc/tenor.gif','https://media.tenor.com/images/eafc0f0bef6d6fd135908eaba24393ac/tenor.gif','https://media.tenor.com/images/d4173fe821ee176f5077ba98d7cdf417/tenor.gif','https://media.tenor.com/images/9164f10a0dbbf7cdb6aeb46184b16365/tenor.gif','https://media.tenor.com/images/3a9d2bd1bde9ed8ea02b2222988be6da/tenor.gif','https://media.tenor.com/images/fae2bbbba0be4db589e47dac43e266f9/tenor.gif','https://media.tenor.com/images/f599d464f0041f9899f8ec41a8e280ac/tenor.gif','https://media.tenor.com/images/8d94e004d553aa9edbb38c823454e421/tenor.gif','https://media.tenor.com/images/269250f1277adbbdafff69f2595ece0c/tenor.gif','https://media.tenor.com/images/558ebbab68370c33c69517b341c3f627/tenor.gif']
	let giffok = giffo[Math.floor(Math.random() * giffo.length)]
		  aruga.sendStickerfromUrl(from, giffok)
		   break
    case 'giphysticker':
	case 'gpsticker':
	   aruga.reply(from, mess.wait, id)
	const giph = ['http://i.imgur.com/UGw1mKB.gif','http://i.imgur.com/pqnXV9o.gif','http://25.media.tumblr.com/3001a8872eff95532084422a9e3bbb5e/tumblr_mgt8eaMwyS1r75klfo1_250.gif']
	      let giphy = giph[Math.floor(Math.random() * giph.length)]
		   aruga.sendStickerfromUrl(from, giphy)
		   break
 case 'sticker2':
        case 'stiker2':
           if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await aruga.sendImageAsSticker(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await aruga.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await client.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    aruga.reply(from, mess.error.Iv, id)
                }
            } else {
                    aruga.reply(from, mess.error.St, id)
            }
            break
	case 'patrickgif':
	case 'gifpatrick':
	    aruga.reply(from, mess.wait, id)
		 const patric = ['https://media.tenor.com/images/1f73d3b99fc0e8edc83d42b42ac54dd3/tenor.gif','https://media.tenor.com/images/4c22f6e140a8985084d91b1de596b84b/tenor.gif','https://media.tenor.com/images/aa5230a94e9417487ceae9ad432d66d3/tenor.gif','https://media.tenor.com/images/f6b093b763e7d716dd7d25cfa7af46bc/tenor.gif','https://media.tenor.com/images/5751fce6378d5aa8ae5f09167a4430d2/tenor.gif','https://media.tenor.com/images/38d85cb97f2438e31bb6b1f441a1b862/tenor.gif','https://media.tenor.com/images/1263f70a2fb28a9512b8dd0c9c16b3af/tenor.gif','https://media.tenor.com/images/18c974ee6d824dde7170f6c40bb14bc6/tenor.gif','https://media.tenor.com/images/ff7a1b585d019c58862afc5075338606/tenor.gif','https://media.tenor.com/images/a71554b96df82b06fbaa2510a906b847/tenor.gif','https://media.tenor.com/images/2a3cfb4899aca0b8b772490320948363/tenor.gif','https://media.tenor.com/images/89296e552a8f155726f37e5d883776e1/tenor.gif']
	     let patrick = patric[Math.floor(Math.random() * patric.length)]
	     aruga.sendStickerfromUrl(from, patrick, 'Neh..', id)
		 break
    

			case 'stickerhentai':
			case 'stikerhentai':
			 aruga.reply(from, mess.wait, id)
				 const hentayo = ['http://i4.xxxhentaigallery.com/photos/204/747-part.jpg','http://i1.xxxhentaigallery.com/photos/193/809__8.jpg','http://i2.xxxhentaigallery.com/photos/165/356_Kidmo.jpg','http://i4.xxxhentaigallery.com/photos/192/811___.jpg','http://i2.xxxhentaigallery.com/photos/179/075_.jpg','http://i1.xxxhentaigallery.com/photos/174/070_Zeroshiki.jpg','http://i1.xxxhentaigallery.com/photos/132/678__Captain_.jpg']
				 let hentayok = hentayo[Math.floor(Math.random() * hentayo.length)]
				 aruga.sendStickerfromUrl(from, hentayok, '', 'Neh...', id)
				 break
case 'gambarquotes':
	case 'quotesgambar':
            aruga.reply(from, mess.wait, id)
			const aiquote = await axios.get("http://inspirobot.me/api?generate=true")
            await aruga.sendFileFromUrl(from, aiquote.data, 'quote.jpg', 'Powered By http://inspirobot.me/ With ❤️' , id )
            break
case 'fotocewek':
 aruga.reply(from, mess.wait, id)
		const cangti = ['https://images.pexels.com/photos/2625122/pexels-photo-2625122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500','https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500','https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500','https://images.pexels.com/photos/2272853/pexels-photo-2272853.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500']
        let cangtip = cangti[Math.floor(Math.random() * cangti.length)]
       aruga.sendFileFromUrl(from, cangtip, 'cewk.jpg')
        break
case 'ceksange':
 if (mentionedJidList.length === 0) return aruga.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *#ceksange* @tagmember', id)
		  const groupMemc = await aruga.getGroupMembers(groupId)
		  let prsen = rate[Math.floor(Math.random() * rate.length)]
		  await aruga.reply(from, `Sange Si @${mentionedJidList} adalah ${prsen}\n\nBy : Toin`, id)
		  break	
 case 'jadwaltv':
		   if (args.length === 0) return aruga.reply(from, 'Kirim perintah *#jadwalTv [channel]*', id)
            const queri = body.slice(10)
            const jadwal = await fetch(`https://api.zeks.xyz/api/jadwaltv?channel=${queri}&apikey=apivinz`)
			const jdwl = await jadwal.json()
          aruga.reply(from, `Nih gan \n${jdwl.result}\n\nBy : Toin\n`, id)
            break
    case 'jadwaltvnow':
case 'jabwaltvnow':
   const jadwalNow = await fetch(`http://docs-jojo.herokuapp.com/api/jadwaltvnow`)
            const jdn = await jadwalNow.json()
            aruga.reply(from, `Jam : ${jdn.result.jam}\n\nJadwalTV : ${jdn.result.jadwalTV}join\n\nBy : Toin\n`, id)
            break
case 'fancytext':
if (args.length == 0)  return aruga.reply(from, 'Kirim perintah *#fancytext textnya', id)
		  const fancynya = await fetch(`https://arugaz.my.id/api/random/text/fancytext?text=${body.slice(11)}`)
		  const fancy = await fancynya.json()
		  aruga.reply(from, fancy.result, id)
		  break 
case 'infonomor':
case 'infonomer':
if (args.length == 0) return aruga.reply(from, 'Nomornya mana??', id)
        const nomro = body.slice(11)
      const nomronya = await fetch(`http://docs-jojo.herokuapp.com/api/infonomor?no=${nomro}`)
      const nmro = await nomronya.json()
      aruga.reply(from, `➸ *Nomor* : ${nmro.nomor} \n➸ *Internasional* : ${nmro.international} \n➸ *Operator* : ${nmro.op}\n\nBy : Toin`, id)
     break 

case 'wa.me':
        case 'wame':
case 'wa':
            await aruga.reply(from, `*Este é o link do seu número do WhatsApp ${pushname}*\n\n*wa.me/${sender.id.replace(/[@c.us]/g, '')}*\n\n*or*\n\n*api.whatsapp.com/send?phone=${sender.id.replace(/[@c.us]/g, '')}*\n\nBy : Toin`, id)
            break 
case 'javcosplay':
					await aruga.reply(from, mess.wait, id)
					rugaapi.cosplay()
					.then(async ({ result }) => {
						let jav = '-----[ *Jav Cosplay* ]-----'
						for (let i = 0; i < result.length; i++) {
							jav += `\n\n• *Title :* ${result[i].title}\n• *Detail :* ${result[i].detail}\n• *URL :* ${result[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
						}
						await aruga.reply(from, jav, id)
						console.log('Succes Sending Jav Cosplay')
					})
					.catch(async (err) => {
						console.error(err)
						aruga.reply(from, 'Error....', id)
					})
					break
case 'japanxxx':
					await aruga.reply(from, mess.wait, id)
					rugaapi.japan()
					.then(async ({ result,data }) => {
						let pan = '-----[ *BOK*P JAPAN* ]-----'
						for (let i = 0; i < result.data.length; i++) {
							pan += `\n\n• *title :* ${result.data[i].title}\n• *url :* ${result.data[i].url}\n• *image :* ${result.data[i].image}\n• *duration :* ${result.data[i].duration}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
						}
						await aruga.reply(from, pan, id)
						console.log('Succes Sending Japan')
					})
					.catch(async (err) => {
						console.error(err)
						aruga.reply(from, 'Error....', id)
					})
					break
case 'koreaxxx':
					await aruga.reply(from, mess.wait, id)
					rugaapi.korea()
					.then(async ({ result,data }) => {
						let pane = '-----[ *BOK*P KOREA* ]-----'
						for (let i = 0; i < result.data.length; i++) {
							pane += `\n\n• *title :* ${result.data[i].title}\n• *url :* ${result.data[i].url}\n• *image :* ${result.data[i].image}\n• *duration :* ${result.data[i].duration}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
						}
						await aruga.reply(from, pane, id)
						console.log('Succes Sending Korea')
					})
					.catch(async (err) => {
						console.error(err)
						aruga.reply(from, 'Error....', id)
					})
					break
case 'indoxxx':
					await aruga.reply(from, mess.wait, id)
					rugaapi.indo()
					.then(async ({ result,data }) => {
						let panek = '-----[ *BOK*P INDO* ]-----'
						for (let i = 0; i < result.data.length; i++) {
							panek += `\n\n• *title :* ${result.data[i].title}\n• *url :* ${result.data[i].url}\n• *image :* ${result.data[i].image}\n• *duration :* ${result.data[i].duration}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
						}
						await aruga.reply(from, panek, id)
						console.log('Succes Sending Indo')
					})
					.catch(async (err) => {
						console.error(err)
						aruga.reply(from, 'Error....', id)
					})
					break
case 'listhentai':
					await aruga.reply(from, mess.wait, id)
					rugaapi.hentai()
					.then(async ({ result }) => {
						let tai = '-----[ *LIST HENTAI* ]-----'
						for (let i = 0; i < result.length; i++) {
							tai += `\n\n• *Title :* ${result[i].title}\n• *url :* ${result[i].url}\n• *detail :* ${result[i].detail}\n• *image :* ${result[i].image}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
						}
						await aruga.reply(from, tai, id)
						console.log('Succes Sending list hentai')
					})
					.catch(async (err) => {
						console.error(err)
						aruga.reply(from, 'Error....', id)
					})
					break
case 'infotogel':
case 'togel':
					await aruga.reply(from, mess.wait, id)
					rugaapi.togel()
					.then(async ({ result,hasil }) => {
						let jav = '-----[ *INFO TOGEL* ]-----'
						for (let i = 0; i < result.hasil.length; i++) {
							jav += `\n\n• *Negara :* ${result.hasil[i].Negara}\n• *Senin :* ${result.hasil[i].Senin}\n• *Selasa :* ${result.hasil[i].Selasa}\n• *Rabu :* ${result.hasil[i].Rabu}\n• *Kamis :* ${result.hasil[i].Kamis}\n• *Jumat :* ${result.hasil[i].Jumat}\n• *Sabtu :* ${result.hasil[i].Sabtu}\n• *Minggu :* ${result.hasil[i].Minggu}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
						}
						await aruga.reply(from, jav, id)
						console.log('Succes Sending Togel')
					})
					.catch(async (err) => {
						console.error(err)
						aruga.reply(from, 'Error....', id)
					})
					break

case 'nekopoinew':
					await aruga.reply(from, mess.wait, id)
					rugaapi.kopi()
					.then(async ({ result }) => {
						let jav = '-----[ *New episode* ]-----'
						for (let i = 0; i < result.length; i++) {
							jav += `\n\n• *Title :* ${result[i].title}\n• *Date :* ${result[i].date}\n• *URL :* ${result[i].url}\n• *thumbnail :* ${result[i].thumbnail}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
						}
						await aruga.reply(from, jav, id)
						console.log('Succes Sending new')
					})
					.catch(async (err) => {
						console.error(err)
						aruga.reply(from, 'Error....', id)
					})
					break
					case 'listnekopoi':
					await aruga.reply(from, mess.wait, id)
					rugaapi.listnek()
					.then (async ({ result }) => {
						let listnekopoi = '-----[ *NEKOPOI LIST* ]-----'
						for (let i = 0; i < result.length; i++) {
							listnekopoi += `\n\n• *Judul :* ${result[i].title}\n• *Seri :* ${result[i].seri}\n• *URL :* ${result[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
						}
						await aruga.reply(from, listnekopoi, id)
						console.log('Succes Sending List Nekopoi')
					})
					.catch(async (err) => {
						console.error(err)
						aruga.reply(from, 'Error...', id)
					})
					break
case 'filmapik':
                        if (args.length == 0) return aruga.reply(from, `Mencari sebuah film dari Webstire Film Apik!\nContoh : ${prefix}filmapik Revolutionary Love`, id)
                        await aruga.reply(from, mess.wait, id)
                        rugaapi.filmapik(args)
                        .then(async ({ result }) => {
                            let filpik = '*-----「 FILM APIK 」-----*'
                            for (let i = 0; i < result.length; i++) {
                                filpik += `\n\n• *Judul :* ${result[i].judul}\n• *URL :* ${result[i].link}\n• *genre_negara :* ${result[i].genre_negara}\n• *Rating :* ${result[i].rating}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
                            }
                            await aruga.sendFileFromUrl(from, result[0].thumb, 'thumb.jpg', filpik, id)
                            console.log('Success sending Movie From Query')
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await aruga.reply(from, 'Error!', id)
                        })
                        break
                                   case 'neonime':
                        if (args.length == 0) return aruga.reply(from, `Mencari sebuah film dari Webstire Film Apik!\nContoh : ${prefix}filmapik Revolutionary Love`, id)
                        await aruga.reply(from, mess.wait, id)
                        rugaapi.neon(args)
                        .then(async ({ result }) => {
                            let nime = '*-----「 NEONIME 」-----*'
                            for (let i = 0; i < result.length; i++) {
                                nime += `\n─────────────────\n\n• *Title* : ${result[i].title}\n• *Deskripsi* : ${result[i].desc}\n• *Link* : ${result[i].link}\n\nBy : Toin`
                            }
                            await aruga.sendFileFromUrl(from, result[0].thumb, 'image.jpg', nime, id)
                            console.log('Success sending neon From Query')
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await aruga.reply(from, 'Error!, silahkan gunakan *#kusonime* saja!', id)
                        })
                        break
                                  
case 'trendingtwit':
                    case 'trendtwit':
                        await aruga.reply(from, mess.wait, id)
                        rugaapi.trend()
                        .then(async ({ result }) => {
                            let trend = '-----[ *TRENDING TWITTER* ]-----'
                            for (let i = 0; i < result.length; i++) {
                                trend += `\n\n➸ *Hashtag :* ${result[i].hastag}\n➸ *Trending Number :* ${result[i].rank}\n➸ *Jumlah Tweets :* ${result[i].tweet}\n➸ *Link :* ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await aruga.reply(from, trend, id)
                            console.log('Success sending Trending Tweets')
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await aruga.reply(from, 'Error!', id)
                        })
                        break
case 'coronaword':
case 'covidword':
                    case 'trendtwit':
                        await aruga.reply(from, mess.wait, id)
                        rugaapi.word()
                        .then(async ({ result }) => {
                            let trend = '-----[ *INFO KORONA BERBAGAI NEGARA* ]-----'
                            for (let i = 0; i < result.length; i++) {
                                trend += `\n\n➸ *updated :* ${result[i].updated}\n➸ *country :* ${result[i].country}\n➸ *cases :* ${result[i].cases}\n➸ *todayCases :* ${result[i].todayCases}\n➸ *deaths :* ${result[i].deaths}\n➸ *active :* ${result[i].active}\n➸ *continent :* ${result[i].continent}\n➸ *critical :* ${result[i].critical}\n➸ *population :* ${result[i].population}\n➸ *tests :* ${result[i].tests}\n➸ *oneDeathPerPeople :* ${result[i].oneDeathPerPeople}\n➸ *testsPerOneMillion :* ${result[i].testsPerOneMillion}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
                            }
                            await aruga.reply(from, trend, id)
                            console.log('Success sending Covid word')
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await aruga.reply(from, 'Error!', id)
                        })
                        break

/*case 'github':
	case 'githubstalk':
                if (args.length == 0) return aruga.reply(from, `Untuk men-stalk akun Github seseorang\nKetik : ${prefix}github [username]\nContoh : ${prefix}github ToinFtrOfc`, id)
                const gitstalk = await rugaapi.github(args[0])
                const gitpict = await rugaapi.githubpict(args[0])
                await aruga.sendFileFromUrl(from, gitpict, '', gitstalk, id)
                .catch(() => {
                    aruga.reply(from, 'Username salah, silahkan masukkan username yang benar', id)
                })
                break*/
case 'iri':
		case 'Iri':
		    aruga.sendPtt(from, './media/iri.mp3', id)
			break
case 'antivirtex':
case 'antivirtek':
            if (!isGroupMsg) return aruga.reply(from, 'Desculpe, este comando só pode ser usado dentro do grupo!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Falha, este comando só pode ser usado por administradores de grupo!', id)
            			return await aruga.reply(from, `\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\nBy : Toinn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBy : Toin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nhttps://youtube.com/c/Toin FITURE OFFICIAL\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`, id)
			break
	  case 'setpic':
                    if (!isOwnerB) return aruga.reply(from, `Este comando só pode ser usado pelo Owner Bot!`, id)
                    if (isMedia) {
                        const mediaData = await decryptMedia(message)
                        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await aruga.setProfilePic(imageBase64)
                        aruga.sendTextWithMentions(`Makasih @${sender.id.replace('@c.us','')} Foto Profilenye..`)
                    } else if (quotedMsg && quotedMsg.type == 'image') {
                        const mediaData = await decryptMedia(quotedMsg)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await aruga.setProfilePic(imageBase64)
                        aruga.sendTextWithMentions(from, `Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
                    } else {
                        aruga.reply(from, `Formato errado! \n⚠️ Envie imagens com ${prefix}setpic`, id)
                    }
                    break
case 'infofilm':
		if (args.length == 0) return aruga.reply(from, 'Namanya mana??', id)
        const nomrohgg = body.slice(10)
      const nomrohggnya = await fetch(`https://tobz-api.herokuapp.com/api/film?q=${nomrohgg}&apikey=BotWeA}`)
      const nmrohgg = await nomrohggnya.json()
      aruga.sendFileFromUrl(from, film.result.thumb, 'thumb.jpg', `*INFO FILM* \n➸ *Judul* : ${film.result.judul} \n➸ *Genre* : ${film.result.genre_negara} \n➸ *Rating* : ${film.result.rating} \n➸ *Link* : ${film.result.link}`, id)
	     break 
		
 case 'filmapikdownload':
            if (args.length == 0) return aruga.reply(from, `Untuk mencari detail film dan link download film gunakan ${prefix}filmapikdownload link filmapik\nContoh : ${prefix}filmapikdownload http://103.194.171.18/peninsula/play`, id)
            axios.get(`https://arugaz.my.id/api/media/filmapik/detail?url=${body.slice(18)}`)
            .then(async (res) => {
                await aruga.sendFileFromUrl(from, `${res.data.result.thumb}`, 'thumb.jpg', `「 *FILM APIK DOWNLOAD* 」\n\n*Judul Film :* ${res.data.result.title}\n*Detail :* ${res.data.result.detail.info}\n\n*Link Download :* ${res.data.result.link_dl}`)
                .catch(() => {
                    aruga.reply(from, 'Film/Url Salah...', id)
                })
            })
            break
            case 'play'://silahkan kalian custom sendiri jika ada yang ingin diubah
           if (args.length == 0) return aruga.reply(from, `Gagal silahkan gunakan *#msc* untuk mendownload lagu dari yt!`, id)
           
 case 'nhpdf':
 if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin', id)
                                            if (args.length == 0)return aruga.reply(from, `Kode nuklir tidak ditemukan\nUsage : ${prefix}nhpdf 20935`, id)
                                rugaapi.nhpdf(args)
                                .then(async(res) => {
                                    await aruga.sendFileFromUrl(from, `${res.pdf_file}`, '', `${res.title}`, id)
                                })
                                .catch(() => {
                                    aruga.reply(from, 'Error kode tidak ditemukan!', id)
                                })
                                break
case 'infoalamat':
        if (args.length == 0) return aruga.reply(from, `Untuk mencari suatu alamat\nUsage : ${prefix}infoalamat polresta`, id)
        rugaapi.ingfo(body.slice(17))
        .then(async(res) => {
            const ingfo = `*Alamat :* ${res.result.data}\n\n*Keterangan :* ${res.result.deskripsi}\n\nBy : Toin`
            aruga.reply(from, ingfo, id)
        })
        .catch(() => {
            aruga.reply(from, 'Errorr...', id)
        })
        break
case 'weather':
        if (args.length == 0) return aruga.reply(from, `Untuk mencari suatu weather city\nUsage : ${prefix}weather surabaya`, id)
        rugaapi.whter(body.slice(8))
        .then(async(res) => {
            const whter = `weather :* ${res.result.weather}\n\n*location :* ${res.result.location}\n\n\nBy : Toin`
            aruga.reply(from, whter, id)
        })
        .catch(() => {
            aruga.reply(from, 'Errorr...', id)
        })
        break

case 'brainly2':
case 'brainly':
        if (args.length == 0) return aruga.reply(from, `Untuk mencari jawaban dari brainly\nUsage : ${prefix}brainly2 NKRI`, id)
        rugaapi.baik(body.slice(9))
        .then(async(res) => {
            const baik = `*Hasil :* ${res.result.data}\n\nBy : Toin`
            aruga.reply(from, baik, id)
        })
        .catch(() => {
            aruga.reply(from, 'Errorr...', id)
        })
        break
case 'googlesearch':
        if (args.length == 0) return aruga.reply(from, `Untuk mencari di google\nUsage : ${prefix}googlesearch NKRI\n\nLink di bedakan dengan tanda koma ( , )`, id)
        rugaapi.ggle(body.slice(9))
        .then(async(res) => {
            const ggle = `*Hasil :* ${res.result}\n\nBy : Toin`
            aruga.reply(from, ggle, id)
        })
        .catch(() => {
            aruga.reply(from, 'Errorr...', id)
        })
        break
case 'cekjodoh2':
case 'cekjodoh':
        if (args.length == 0) return aruga.reply(from, `Untuk mengecekjodoh\nUsage : ${prefix}cekjodoh2 dia saya`, id)
        rugaapi.virgin(args[0],args[1])
        .then(async(res) => {
            const virgin = `*Hasil :* ${res.result.hasil}\n\nBy : Toin`
            aruga.reply(from, virgin, id)
        })
        .catch(() => {
            aruga.reply(from, 'Errorr...', id)
        })
        break
case 'artinama2':
case 'artinama':
        if (args.length == 0) return aruga.reply(from, `Untuk mengecek artinama anda\nUsage : ${prefix}artinama2 Toin`, id)
        rugaapi.name(args[0],args[1])
        .then(async(res) => {
            const name = `*Hasil :* ${res.result.hasil}\n\nBy : Toin`
            aruga.reply(from, name, id)
        })
        .catch(() => {
            aruga.reply(from, 'Errorr...', id)
        })
        break
case 'harijadi':
        if (args.length == 0) return aruga.reply(from, `Untuk mengecek arti harijadi\nUsage : ${prefix}harijadi 16 08 2019`, id)
       const putus = await rugaapi.putus(args[0],args[1],args[2])
            await aruga.reply(from, putus, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
case 'lirik2':
case 'lirik':
        if (args.length == 0) return aruga.reply(from, `Untuk mencari lirik lagu\nUsage : ${prefix}lirik2 sayang`, id)
        rugaapi.lirik2(body.slice(7))
        .then(async(res) => {
            const lirik2 = `Lirik Lagu: ${body.slice(7)}\n\n${res.result.result}\n\nBy : Toin`
            aruga.reply(from, lirik2, id)
        })
        .catch(() => {
            aruga.reply(from, 'Errorr...', id)
        })
        break
case 'chord':
        if (args.length == 0) return aruga.reply(from, `Untuk mencari chord lagu\nUsage : ${prefix}chord sayang`, id)
        rugaapi.chord(body.slice(7))
        .then(async(res) => {
            const chord = `chord Lagu: ${body.slice(7)}\n\n${res.result.result}\n\nBy : Toin`
            aruga.reply(from, chord, id)
        })
        .catch(() => {
            aruga.reply(from, 'Errorr...', id)
        })
        break
case 'wikien':
        if (args.length == 0) return aruga.reply(from, `Untuk mencari di wikipedia berbahasa inggirs\nUsage : ${prefix}wikien kata`, id)
        rugaapi.wikien(body.slice(7))
        .then(async(res) => {
            const wikien = `Kata: ${body.slice(7)}\n\n${res.result.desc}\n\nBy : Toin`
            aruga.reply(from, wikien, id)
        })
        .catch(() => {
            aruga.reply(from, 'Maaf server sedang error!', id)
        })
        break
  case 'covid19':
            case 'corona':
                rugaapi.corona()
                .then(async (res) => {
                    await aruga.reply(from, `${res}`, id)
                })
                break

 case 'igstory':
                    if (args.length == 0) return aruga.reply(from, `Enviar pedidos ${prefix}igstory [linkigstory]`, id)
                    aruga.reply(from, '_Scrapping Metadata..._', id)
                    rugaapi.story(body.slice(9))
                    .then(async(res) => {
                        const { urlDownload } = itemlist
                        if (res.error) return aruga.sendFileFromUrl(from, `${res.url}`, '', `${res.error}`, id)
                        await aruga.sendFileFromUrl(from, `${urlDownload[0]}`, '', '', id)
                    })
                    .catch(() => {
                        aruga.reply(from, 'Error...' , id)
                    })
                    break
        case 'getpic':
            if (!isGroupMsg) return aruga.reply(from, `Este recurso só pode ser usado em grupos`, id)
            const texnugm = body.slice(8)
            const getnomber =  await aruga.checkNumberStatus(texnugm)
            const useriq = getnomber.id.replace('@','') + '@c.us'
                try {
                    var jnck = await aruga.getProfilePicFromServer(useriq)
    
                    aruga.sendFileFromUrl(from, jnck, `awok.jpg` , `nehh ngab`)
                } catch {
                    aruga.reply(from, `Sem foto de perfil!`, id)
                }
            break
       
        case 'help':
            const bots = `oiin *${pushname}!* , este é o Toin Bot, para descobrir o menu de comandos, digite *${prefix}menu* , *${prefix}Toin*`
            await aruga.reply(from, bots , id)
            break
        case 'menu':
  case 'help':
case 'toin':
            await aruga.sendText(from, menuId.textMenu(pushname))
            .then(() => ((isGroupMsg) && (isGroupAdmins)) ? aruga.sendText(from, `Prefix : *`) : null)
            break
            
                case 'donate':
        case 'donasi':
            await aruga.sendText(from, menuId.textDonasi())
            break
case 'infoloker':
            await aruga.sendText(from, menuId.textLoker())
            break
          case 'tod':
    case 'game':
    aruga.reply(from, `Antes de jogar, prometa cumprir qualquer comando dado.\n*GA OUSA DESAFIAR O DESAFIO DE NÃO JOGAR!!.*\n\nPor favor selecione:\n➥ ${prefix}truth\n➥ ${prefix}dare`, id)
    break
    case 'truth':
           fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/truth.txt')
            .then(res => res.text())
            .then(body => {
                let splitmotivasi = body.split('\n')
                let randommotivasi = splitmotivasi[Math.floor(Math.random() * splitmotivasi.length)]
                aruga.reply(from, randommotivasi, id)
            })
            .catch(() => {
                aruga.reply(from, 'Há um erro!', id)
            })
            break
    case 'dare':
               fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/dare.txt')
            .then(res => res.text())
            .then(body => {
                let splitmotivasi = body.split('\n')
                let randommotivasi = splitmotivasi[Math.floor(Math.random() * splitmotivasi.length)]
                aruga.reply(from, randommotivasi, id)
            })
            .catch(() => {
                aruga.reply(from, 'Há um erro!', id)
            })
            break
  case 'citacita'://Piyobot
          fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/citacita/main/citacita.txt')
            .then(res => res.text())
            .then(body => {
            let cita = body.split('\n')
            let raya = cita[Math.floor(Math.random() * cita.length)]
            aruga.sendFileFromUrl(from, raya, 'Toin.mp3', id)
                .then(() => console.log('Sucesso ao enviar cita'))
              })
             .catch(() => {
            aruga.reply(from, 'Há um erro!', id)
             })
             break
         case 'kbbi':
            if (args.length == 0) return aruga.reply(from, `Para encontrar uma palavra do Grande Dicionário Indonésio (KBBI)\ntipo: ${prefix}kbbi [a palavra]`, id)
            const kbbip = body.slice(6)
            const kbbis = await rugaapi.kbbi(kbbip)
            await aruga.reply(from, kbbis, id)
            .catch(() => {
                aruga.reply(from, 'há um erro!!', id)
            })
            break
     	
        case 'logopornhub':
case 'pornhub':
            if (args.length === 0) return aruga.reply(from, `Enviar pedidos *${prefix}logopornhub [ |Teks1|Teks2 ]*,\n\n exemplo : *${prefix}logopornhub |Toin| HUB*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                aruga.reply(from, `wait....`, id)
                const lpornhub = argz[1]
                const lpornhub2 = argz[2]   
                if (lpornhub > 10) return aruga.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (lpornhub2 > 10) return aruga.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                aruga.sendFileFromUrl(from, `https://arugaz.my.id/api/textpro/pornhub?text1=${lpornhub}&text2=${lpornhub2}`)
            } else {
                await aruga.reply(from, `Formato incorreto!\n[❗] Enviar pedidos *${prefix}pornhub [ |Teks1| Teks2 ]*,\n\n exemplo : *${prefix}pornhub |Dimas| HUB*`, id)
            }
            break
case 'bot3':
		if (args.length == 0) return aruga.reply(from, 'Menu para falar com clareza, mano,\nExemploo: *bot3 Oiin', id)
            const arbu = body.slice(5)
		axios.get(`http://videfikri.com/api/simsimi/?teks=${arbu}`).then(res => {
		console.log(arbu)
		const segey = `${res.data.jawaban}`
		aruga.reply(from, segey, id)
		console.log(segey)
	})
    break
    case 'simi':
            if (args.length == 0) return aruga.reply(from, 'Kirim perintah */ [teks]*\nContoh : */ halo*')
            const que = body.slice(6)
            const sigo = await axios.get(`https://st4rz.herokuapp.com/api/simsimi?kata=${que}`)
            console.log(que)
            const sigot = sigo.data
            aruga.reply(from, sigot.result, id)
            console.log(sigot)
            break
 case 'iplocation':
                            if (args.length == 0) return aruga.reply(from, `Não há endereço IP, digite seu endereço IP\nExemplo : ${prefix}iplocation 180.242.215.107`, id)
                            axios.get(`https://ipapi.co/${body.slice(12)}/json/`)
                            .then(async(res) => {
                                const addr = `• *Ip :* ${res.data.ip}\n• *Ip Version :* ${res.data.version}\n• *Negara :* ${res.data.country_name}\n• *Kode Negara :* ${res.data.country_code}\n• *Ibu Kota :* ${res.data.country_capital}\n• *Wilayah :* ${res.data.region}\n• *Kode Wilayah :* ${res.data.region_code}\n• *Postal :* ${res.data.postal}\n• *Latitude :* ${res.data.latitude}\n• *Longitude :* ${res.data.longitude}\n• *Timezone :* ${res.data.timezone}\n• *Utc Offset :* ${res.data.utc_offset}\n• *Kode Panggilan Negara :* ${res.data.country_calling_code}\n• *Mata Uang :* ${res.data.currency_name}\n• *Kode Mata Uang :* ${res.data.currency}\n• *Bahasa :* ${res.data.languages}\n• *Jumlah Wilayah :* ${res.data.country_area}\n• *Populasi Negara :* ${res.data.country_population}\n• *ASN :* ${res.data.asn}\n• *Provider :* ${res.data.org}`
                                aruga.reply(from, addr, id)
                            })
                            break
                        case 'matauang':
                            const matung = `*List Currency :* btc, usd, eur, gbp, aud, cad, chf, cny, jpy, sgd, nzd, pkr, hkd, krw, mxn, nok, egp, clp, ngn, brl, rub, uah, thb, pln, inr, eth, xmr, dash, doge, ltc, str, xrp`
                            aruga.reply(from, matung, id)
                            break
                            
  case 'convertduit':
                        if (args.length == 0) return aruga.reply(from, `Para converter dinheiro de outros países em IDR\nExemplo : ${prefix}convertduit usd|2000\n\nE verificar a moeda pode ser útil ${prefix}matauang`, id)
                        const duit1 = arg.split('|')[0]
                        const duit2 = arg.split('|')[1]
                        await axios.get('https://api.terhambar.com/currency?curr='+duit1+'&bal='+duit2).then(res => {
                            const duitnya = `Conversão de moeda ${res.data.result.currency} a partir de ${duit2}\n\nMoeda do saldo : *${res.data.result.balanceCurrency}*\n\nOs resultados são convertidos : *${res.data.result.resultConvert}*`
                            aruga.reply(from, duitnya, id)
                        })
                        break
    case 'bot2':
       if (args.length == 0) return aruga.reply(from, 'Menu buat bicara gajelas gan,\nContoh: #bot2 halo', id)
        const anjg = body.slice(6)
        axios.get(`https://tobz-api.herokuapp.com/api/simsimi?text=${anjg}&apikey=BotWeA`).then(res => {
            console.log(anjg)
            const babuy = `${res.data.result}`
            aruga.reply(from, babuy, id)
            console.log(babuy)
        })
        break
case 'bot':
       if (args.length == 0) return aruga.reply(from, 'Menu buat bicara gajelas gan,\nContoh: #bot halo', id)
        const anjgq = body.slice(5)
        axios.get(`https://videfikri.com/api/simsimi/?teks=${anjgq}`).then(res => {
            console.log(anjgq)
            const babuyq = `${res.data.jawaban}`
            aruga.reply(from, babuyq, id)
            console.log(babuyq)
        })
        break

        case 'slightningt':
            aruga.reply(from, `Calmaer opohar`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const rugaapi = imgnye.result.imgUrl
                await aruga.sendStickerfromUrl(from, rugaapi)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const rugaapi = imgnye.result.imgUrl
                await aruga.sendStickerfromUrl(from, rugaapi)
            } else {
                await aruga.reply(from, `Formato incorreto!\n⚠️ Envie fotos com *stickerlightning`, id)
            }
            break
        case 'stikerfire':
        case 'stickerfire':
        case 'sfire':
           aruga.reply(from, `Calmaer opohar!`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await aruga.sendStickerfromUrl(from, Sfire)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await aruga.sendStickerfromUrl(from, Sfire)
            } else {
                await aruga.reply(from, `Formato incorreto!\n⚠️ Envie fotos com *stickerfire`, id)
            }
            break
        case 'thunder':
            if (args.length === 0) return aruga.reply(from, `Enviar pedidos *${prefix}thunder [ Teks ]*, exemplo *${prefix}thunder Toin*`, id)
            aruga.reply(from, mess.wait, id)
            const thndr = body.slice(9)
            if (thndr.length > 10) return aruga.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await aruga.sendFileFromUrl(from, `https://api.vhtear.com/thundertext?text=${thndr}&apikey=${vhtearkey}`, 'thndr.jpg', '', id)
            break
        case 'tebakgambar':
            try {
            const resp = await axios.get('https://api.vhtear.com/tebakgambar&apikey=' + vhtearkey)
            if (resp.data.error) return aruga.reply(from, resp.data.error, id)
            const anm2 = `➸ Soal : ${resp.data.result.soal}\n\n➸ Poin : ${resp.data.result.poin}`
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}\n\nBy : Toin`
            aruga.sendFileFromUrl(from, resp.data.result.soalImg, 'tebakgambar.jpg', '_Silahkan Jawab Maksud Dari Gambar Ini_', id)
            aruga.sendText(from, `wait....`, id)
            await sleep(21000)
            aruga.sendText(from, `30 Detik Lagi...`, id)
            await sleep(20000)
            aruga.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10500)
            aruga.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            aruga.reply(from, jwban, id)
            } catch (err) {
                console.error(err.message)
                await aruga.sendFileFromUrl(from, errorurl2, 'error.png', ' Maaf, Soal Quiz tidak ditemukan')
           }
           break
 case 'anoboy':
                        await aruga.reply(from, mess.wait, id)
                        rugaapi.anoboy()
                            .then(async ({ result }) => {
                                let anoboyInfo = '-----[ *ANOBOY ON-GOING* ]-----'
                                for (let i = 0; i < result.length; i++) {
                                    anoboyInfo += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nBy : Toin`
                                }
                                await aruga.reply(from, anoboyInfo, id)
                                console.log('Success sending on-going anime!')
                            })
                            .catch(async (err) => {
                                console.error(err)
                                await aruga.reply(from, 'Error!', id)
                            })
                    break
                    case 'imagetourl':
                        case 'imgtourl':
                            if (isMedia && isImage || isQuotedImage) {
                                await aruga.reply(from, mess.wait, id)
                                const encryptMedia = isQuotedImage ? quotedMsg : message
                                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                                const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                                await aruga.reply(from, linkImg, id)
                            } else {
                                await aruga.reply(from, 'Format pesan salah...', id)
                            }
                        break
                    case 'findsticker':
                        case 'findstiker':
                           if (args.length == 0) return aruga.reply(from, `Format pesan salah!\nContoh : ${prefix}findstiker gore`, id)
                            await aruga.reply(from, mess.wait, id)
                            try {
                                rugaapi.sticker(args)
                                    .then(async ({ result }) => {
                                        if (result.response !== 200) return await aruga.reply(from, 'Not found!', id)
                                        for (let i = 0; i < result.data.length; i++) {
                                            await aruga.sendStickerfromUrl(from, result.data[i])
                                        }
                                        console.log('Success sending sticker!')
                                    })
                            } catch (err) {
                                console.error(err)
                                await aruga.reply(from, `Error!\n\n${err}`, id)
                            }
                        break
 case 'missing':
 if (args.length == 0) return aruga.reply(from, `Format pesan salah!`, id)
                           
           if (args.length == 0) return aruga.reply(from, 'Format pesan salah')
            const atas = q.substring(0, q.indexOf('|') - 1)
            const tengah = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
            const bawah = q.substring(q.lastIndexOf('|') + 2)
            if (isMedia && isImage || isQuotedImage) {
                await aruga.reply(from, mess.wait, id)
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageLink = await uploadImages(mediaData, `missing.${sender.id}`)
                rugaapi.missing(atas, tengah, bawah, imageLink)
                    .then(async ({ result }) => {
                        await aruga.sendFileFromUrl(from, result.imgUrl, 'missing.jpg', '', id)
                        console.log('Success sending image!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, 'Error!', id)
                    })
            } else {
                await aruga.reply(from, 'Format pesan salah', id)
            }
        break
 case 'stalktwit':
            case 'stalktwitter':
                if (args.length == 0) return aruga.reply(from, `Untuk men-stalk akun Burung Biru/Twitter seseorang\nketik ${prefix}stalktwit [username]\ncontoh : ${prefix}twitter anakbabi123`, id)
                const stalkus = await rugaapi.stalktwit(args[0])
                const sulkas = await rugaapi.burpot(args[0])
                await aruga.sendFileFromUrl(from, sulkas, '', stalkus, id)
                .catch(() => {
                    aruga.reply(from, 'Maaf, username tidak ditemukan', id)
                })
                break
        case 'myzodiac':
            case 'myzodiak':
 if (args.length == 0) return aruga.reply(from, `Format pesan salah!\nContoh : ${prefix}myzodiak Virgo`, id)
                                     if (args.length == 0) return await aruga.reply(from, 'Format pesan salah', id)
                await aruga.reply(from, mess.wait, id)
                rugaapi.zodiak2(args[0])
                    .then(async ({ result }) => {
                        if (result.status === 204) {
                            return await aruga.reply(from, result.ramalan, id)
                        } else {
                            let ramalan = `Zodiak: ${result.zodiak}\n\nRamalan: ${result.ramalan}\n\nAngka laksek: ${result.nomorKeberuntungan}\n\n${result.motivasi}\n\n${result.inspirasi}\n\nBy : Toin`
                            await aruga.reply(from, ramalan, id)
                                .then(() => console.log('Success sending zodiac fortune!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, 'Error!', id)
                    })
            break
        case 'caklonToing':
            try {
            const resp = await axios.get('https://api.vhtear.com/funkuis&apikey=' + vhtearkey)
            if (resp.data.error) return aruga.reply(from, resp.data.error, id)
            const anm2 = `➸ Soal : ${resp.data.result.soal}\n\n➸ Poin : ${resp.data.result.poin}`
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}\n\n➸ Deskripsi : ${resp.data.result.desk}\n\nBy : Toin`
            aruga.reply(from, anm2, id)
            aruga.sendText(from, `30 Detik Lagi...`, id)
            await sleep(20000)
            aruga.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10500)
            aruga.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            aruga.reply(from, jwban, id)
            } catch (err) {
                console.error(err.message)
                await aruga.sendFileFromUrl(from, errorurl2, 'error.png', ' Maaf, Soal Quiz tidak ditemukan')
           }
           break
        case 'ownerbot':
case 'owner':
            await aruga.sendContact(from, ownerNumber)
            .then(() => aruga.sendText(from, 'por favor quem quiser conversar com o número do dono'))
            break
            case 'maps':

            rugaapi.maps()
            .then(async (res) => {
            	await aruga.reply(from, `${res}`, id)
            })
            break
           
            case 'wallpaper':
case 'walpaper':
case 'wallpaper2':
                aruga.reply(from, mess.wait, id);
                axios.get('https://akaneko-api.herokuapp.com/api/mobileWallpapers').then(res => {
                    aruga.sendFileFromUrl(from, res.data.url, 'Desktop Wallpaper.jpeg', 'Nih...', id);
                });
                break               
            case 'autosticker':
	        case 'autostiker':
            case 'autostik':
                if (args[0] === 'enable') {
                    if (isAutoStikerOn) return await aruga.reply(from, 'O recurso de autosticker automático foi ativado', id)
                    _autostiker.push(chat.id)
                    fs.writeFileSync('./lib/helper/antisticker.json', JSON.stringify(_autostiker))
                    await aruga.reply(from, 'Recurso autosticker ativado com sucesso' , id)
                } else if (args[0] === 'disable') {
                    _autostiker.splice(chat.id, 1)
                    fs.writeFileSync('./lib/helper/antisticker.json', JSON.stringify(_autostiker))
                    await aruga.reply(from, 'Recursos autostiker desabilitado com sucesso' , id)
                } else {
                    await aruga.reply(from, 'Format salah' , id)
                }
            break
                case 'neko':
                try {
                    aruga.reply(from, mess.wait, id)
                    axios.get('https://akaneko-api.herokuapp.com/api/neko').then(res => {
                        aruga.sendFileFromUrl(from, res.data.url, 'neko.jpeg', 'Neko *Nyaa*~');
                    });
                } catch (err) {
                    console.log(err);
                    throw(err);
                };
                break
               
                case 'bjanime':
                aruga.reply(from, mess.wait, id);
                axios.get('https://nekos.life/api/v2/img/blowjob').then(res => {
                	aruga.sendFileFromUrl(from, res.data.url);
                });
                break
               
               case 'rhentai':
               aruga.reply(from, mess.wait, id);
               axios.get('https://nekos.life/api/v2/img/hentai').then(res => {
               	aruga.sendFileFromUrl(from, res.data.url);
               });
               break
               case 'kissgif':
               aruga.reply(from, mess.wait, id);
               axios.get('https://nekos.life/api/v2/img/kiss').then(res => {
               	aruga.sendFileFromUrl(from, res.data.url);
               });
               break
                case 'cumgif':
                aruga.reply(from, mess.wait, id);
                axios.get('https://nekos.life/api/v2/img/cum').then(res => {
                	aruga.sendFileFromUrl(from, res.data.url)
                });
                break
                case 'bjgif':
                aruga.reply(from, mess.wait, id);
                axios.get('https://nekos.life/api/v2/img/bj').then(res => {
                	aruga.sendFileFromUrl(from, res.data.url);
                });
              break 
                        
                case 'nsfwgif':
                aruga.reply(from, mess.wait, id);
                axios.get('https://nekos.life/api/v2/img/nsfw_neko_gif').then(res => {
                	aruga.sendFileFromUrl(from, res.data.url);
                });
                break
                case 'waifu':
                aruga.reply(from, mess.wait, id);
                axios.get('https://nekos.life/api/v2/img/waifu').then(res => {
                    aruga.sendFileFromUrl(from, res.data.url, 'Waifu UwU');
                });
                break
                case 'slap':
                aruga.reply(from, mess.wait, id);
                axios.get('https://nekos.life/api/v2/img/slap').then(res => {
                	aruga.sendFileFromUrl(from, res.data.url);
                });
                break
                case 'rhug':
                aruga.reply(from, mess.wait, id);
                axios.get('https://nekos.life/api/v2/img/hug').then(res => {
                	aruga.sendFileFromUrl(from, res.data.url);
                });
                break
                case 'animeavatar':
                    aruga.reply(from, mess.wait, id);
                    axios.get('https://nekos.life/api/v2/img/avatar').then(res => {
                        aruga.sendFileFromUrl(from, res.data.url, 'Avatar UwU');
                    });
                    break
                case 'baka':
                aruga.reply(from, mess.wait, id);
                axios.get('https://nekos.life/api/v2/img/baka').then(res => {
                    aruga.sendFileFromUrl(from, res.data.url, 'baka')
                })
                break
                case 'aesthetic':
                    const anjayani = estetek[Math.floor(Math.random() * estetek.length)]
                    await aruga.sendImage(from,anjayani, id)
                    .then(() => aruga.sendText(from, 'nehh buat wallpaper lu'))
                    break
                case 'pictcogan':
                        const ganteng = cegan[Math.floor(Math.random() * cegan.length)]
                        await aruga.sendImage(from, ganteng)
                        .then(() => aruga.sendText(from, 'nehh pict cogann xixi'))
                        break
                    case 'pictcecan':
                        const cantik = cecan[Math.floor(Math.random() * cecan.length)]
                        await aruga.sendImage(from, cantik.imagex, 'Cecan.jpg', cantik.lahwoi, id)
                        break
                case 'antilink':
                    if (!isGroupMsg) return aruga.reply(from, 'Desculpe, este comando só pode ser usado dentro de grupos!', id)
                    if (!isGroupAdmins) return aruga.reply(from, 'Falha, este comando só pode ser usado por administradores de grupo!', id)
                    if (!isBotGroupAdmins) return aruga.reply(from, 'Ó administrador, torne-me o administrador do grupo primeiro :)', id)
                    if (args[0] == 'on') {
                        var cek = antilink.includes(chatId);
                        if(cek){
                            return aruga.reply(from, '*Detector de link* já está ativo neste grupo', id) //if number already exists on database
                        } else {
                            antilink.push(chatId)
                            fs.writeFileSync('./lib/helper/antilink.json', JSON.stringify(antilink))
                            aruga.reply(from, '*[Detector de link*]* Foi ativado\nCada membro do grupo que enviar uma mensagem contendo o link do grupo será chutado pelo bot!', id)
                        }
                    } else if (args[0] == 'off') {
                        var cek = antilink.includes(chatId);
                        if(!cek){
                            return aruga.reply(from, '*O detector de link* não está mais ativo neste grupo', id) //if number already exists on database
                        } else {
                            let nixx = antilink.indexOf(chatId)
                            antilink.splice(nixx, 1)
                            fs.writeFileSync('./lib/helper/antilink.json', JSON.stringify(antilink))
                            aruga.reply(from, '*[Detector de link]* foi desabilitado\n', id)
                        }
                    } else {
                        aruga.reply(from, `escolher on / off\n\n*[Detector de link]*\nCada membro do grupo que enviar uma mensagem contendo o link do grupo será chutado pelo bot!`, id)
                    }
                    break  
                    case 'tag':
                    if (!isGroupMsg) return aruga.reply(from, 'este comando só pode ser usado dentro do grupo', id)
                    if (!args.length >= 1) return await aruga.reply(from, 'a mensagem não pode estar vazia', id) ;{
                        const text = body.slice(5)
                        const mem = groupMembers
                        const randMem = mem[Math.floor(Math.random() * mem.length)];
                        const sapa = `${text} 👉 @${randMem}`
                        await aruga.sendTextWithMentions(from, sapa)
                    }
                    break    
                    case 'ava':
                    if (!isGroupMsg) return aruga.reply(from, 'Este recurso só pode ser usado em grupos', id)
                    if (!quotedMsg) return aruga.reply(from, 'Citar/responder a mensagem de alguém que será baixado foToinya!!', id)
                    try {
                        const dp = await aruga.getProfilePicFromServer(quotedMsgObj.sender.id)
                        if (dp == undefined) {
                            var pfp = aruga.reply(from, 'Ele é tímido, talvez esteja deprimido e não se atreva a colocar uma foto no perfil', id)
                            } else {
                            var pfp = aruga.sendFileFromUrl(from, dp, 'profile.png')
                            } 
                    } catch {
                        aruga.reply(from, 'Sem foto de perfil/privada', id)
                    }
                    break
                    case 'mystat':
                    case 'mestat':{
                    const userid = sender.id
                    const ban = banned.includes(userid)
                    const blocked = await aruga.getBlockedIds()
                    const isblocked = blocked.includes(userid)
                    const ct = await aruga.getContact(userid)
                    const isOnline = await aruga.isChaToinline(userid) ? '✔' : '❌'
                    var sts = await aruga.getStatus(userid)
                    const bio = sts
                    const admins = groupAdmins.includes(userid) ? 'Admin' : 'Membro'
                    var found = false
                        Object.keys(pengirim).forEach((i) => {
                            if(pengirim[i].id == userid){
                                found = i
                            }
                        })
                    var adm = admins
                    if (ct == null) {
                        return await aruga.reply(from, 'Número do WhatsApp inválido [não registrado no WhatsApp]', id) 
                    } else {
                    const contact = ct.pushname
                    const dp = await aruga.getProfilePicFromServer(userid)
                    if (dp == undefined) {
                        var pfp = 'https://raw.githubusercontent.com/Gimenz/line-break/master/profil.jpg'
                        } else {
                        var pfp = dp
                        } 
                    if (contact == undefined) {
                        var nama = '_Ele é tímido, não quer mostrar o nome dele_' 
                        } else {
                        var nama = contact
                        } 
                    const caption = `*Detalhe Membro* ✨ \n\n● *Nome :* ${nama}\n● *Bio :* ${bio.status}\n● *Chat link :* wa.me/${sender.id.replace('@c.us', '')}\n● *Cargo :* ${adm}\n● *Banned by Bot :* ${ban ? '✔' : '❌'}\n● *Blocked by Bot :* ${isblocked ? '✔' : '❌'}\n● *Chat with bot :* ${isOnline}\n\nBy : Toin`
                    aruga.sendFileFromUrl(from, pfp, 'dp.jpg', caption)
                    }
                    }
                break     
                case 'jadian':
                    if (!isGroupMsg) return aruga.reply(from, 'este comando só pode ser usado dentro do grupo', id)
                    const mem = groupMembers
                    const aku = mem[Math.floor(Math.random() * mem.length)];
                    const kamu = mem[Math.floor(Math.random() * mem.length)];
                    const sapa = `Cieee... @${aku.replace(/[@c.us]/g, '')} (💘) @${kamu.replace(/[@c.us]/g, '')} acabei de te inventar\nPor favor, compartilhe o pj\n\nBy : Toin`
                    await aruga.sendTextWithMentions(from, sapa)
                    break     
                
            case 'resend':
                if (!isGroupAdmins) return aruga.reply(from, 'Falha, este recurso só pode ser usado por Admin',id)
                if (quotedMsgObj) {
                    let encryptMedia
                    let replyOnReply = await aruga.getMessageById(quotedMsgObj.id)
                    let obj = replyOnReply.quotedMsgObj
                    if (/ptt|audio|video|image|document|sticker/.test(quotedMsgObj.type)) {
                        encryptMedia = quotedMsgObj
                        if (encryptMedia.animated) encryptMedia.mimetype = ''
                    } else if (obj && /ptt|audio|video|image/.test(obj.type)) {
                        encryptMedia = obj
                    } else return
                    const _mimetype = encryptMedia.mimetype
                    const mediaData = await decryptMedia(encryptMedia)
                    await aruga.sendFile(from, `data:${_mimetype};base64,${mediaData.toString('base64')}`, 'file', ':)', encryptMedia.id)
                } else aruga.reply(from, config.msg.noMedia, id)
                break
          case 'ameliandani':
                    const andani = fs.readFileSync('./lib/amelia.json')
                    const amel = JSON.parse(andani)
                    const randum = Math.floor(Math.random() * amel.length)
                    const uwoyy = amel[randum]
                    aruga.sendImage(from, uwoyy.image, 'Amel.jpg', uwoyy.teks, id)
                    break
            case 'bokep': // MFARELS
            case 'randombokep': // MFARELS
            case '18+': // MFARELS
                // MFARELS
                const mskkntl = fs.readFileSync('./lib/18+.json') // MFARELS
                const kntlnya = JSON.parse(mskkntl) // MFARELS
                const rindBkp = Math.floor(Math.random() * kntlnya.length) // MFARELS
                const rindBkep = kntlnya[rindBkp] // MFARELS
                aruga.sendFileFromUrl(from, rindBkep.image, 'Bokep.jpg', rindBkep.teks, id) // MFARELS
                break
case 'nulis2':
    if (args.length == 0) return aruga.reply(from, `Criação de deslizamento de texto\nUso: ${prefix}nulis2 [teks]\n\nexemplo: ${prefix}nulis2 Toin`, id)
                    await aruga.reply(from, `wait....`, id)
                console.log('sedang menulis...')
                const nulis2q = body.slice(10)
                await aruga.sendFileFromUrl(from, `https://api.vhtear.com/write?text=${nulis2q}&apikey=${vhtearkey}`, '', 'nih....', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!,mohon kurangi teksnya!`, id)
                    })
            break
 case 'lovemessagetext':
case 'lovetext':
    if (args.length == 0) return aruga.reply(from, `Membuat Text jadi Gambar lovemessage\nPemakaian: ${prefix}lovetext [teks]\n\ncontoh: ${prefix}lovetext Toin`, id)
                    await aruga.reply(from, `Wait sedang diproses....`, id)
                console.log('Creating lovemessagetext text...')
                const llovemessagetext = body.slice(10)
                await aruga.sendFileFromUrl(from, `https://api.vhtear.com/lovemessagetext?text=${llovemessagetext}&apikey=${vhtearkey}`, '', 'Nih...', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
            break
       case 'join':
                        if (args.length == 0) return aruga.reply(from, `Para convidar bots para o grupo, envie o proprietário do bate-papo para que o bot seja incluído em seu grupo\n\n*Mem. Mínimo 180 e acima!*`, id)
           
        case 'shopee':
             if (args.length === 0) return aruga.reply(from, `Enviar pedidos *${prefix}shopee [ Query ]*, Exemplo : *${prefix}shopee HP Samsul a20*`, id)
            const shopek = body.slice(8)
            aruga.reply(from, mess.wait, id)
            try {
                const dataplai = await axios.get(`https://api.vhtear.com/shopee?query=${shopek}&count=5&apikey=${vhtearkey}`)
                const dataplay = dataplai.data.result
                 let shopeq = `*「 SHOPEE 」*\n\n*Resultado da pesquisa : ${shopek}*\n`
                for (let i = 0; i < dataplay.items.length; i++) {
                    shopeq += `\n─────────────────\n\n• *Nome* : ${dataplay.items[i].nama}\n• Preço* : ${dataplay.items[i].harga}\n• *Vendido* : ${dataplay.items[i].terjual}\n• *Localização da loja* : ${dataplay.items[i].shop_location}\n• *Deskripsi* : ${dataplay.items[i].description}\n• *Link do Produto : ${dataplay.items[i].link_product}*\n\nBy : Toin\n`
                }
                await aruga.sendFileFromUrl(from, dataplay.items[0].image_cover, `shopee.jpg`, shopeq, id)
            } catch (err){
                console.log(err)
            }
            break
   case 'playstore':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}playstore [ Query ]*, Contoh : *${prefix}playstore Mobile Legends*`, id)
            const keywotp = body.slice(11)
            aruga.reply(from, mess.wait, id)
            try {
                const dataplai = await axios.get(`https://api.vhtear.com/playstore?query=${keywotp}&apikey=${vhtearkey}`)
                const dataplay = dataplai.data
                 let keluarplay = `*「 PLAYSTORE 」*\n\nHasil Pencarian : ${keywotp}*\n`
                for (let i = 0; i < dataplay.result.length; i++) {
                    keluarplay += `\n─────────────────\n\n• *Nama* : ${dataplay.result[i].title}\n• *Developer* : ${dataplay.result[i].developer}\n• *Deskripsi* : ${dataplay.result[i].description}\n• *Paket ID* : ${dataplay.result[i].app_id}\n• *Harga* : ${dataplay.result[i].price}\n• *Link App* : https://play.google.com${dataplay.result[i].url}\n\nBy : Toin\n`
                }
                await aruga.sendFileFromUrl(from, dataplay.result[0].icon, `iconapk.webp`, keluarplay, id)
            } catch (err){
                console.log(err)
            }
            break
        case 'setgroupname':
            if (!isGroupMsg) return aruga.reply(from, `Este recurso só pode ser usado em grupos`, id)
            if (!isGroupAdmins) return aruga.reply(from, `Este recurso só pode ser usado por administradores de grupo`, id)
            if (!isBotGroupAdmins) return aruga.reply(from, `Este recurso só pode ser usado quando o bot é um administrador`, id)
            const namagrup = body.slice(14)
            const sebelum = chat.groupMetadata.gcok
            let halaman = global.page ? global.page : await aruga.getPage()
            await halaman.evaluate((chatId, subject) =>
            Store.WapQuery.changeSubject(chatId, subject),groupId, `${namagrup}`)
            aruga.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
            break
        case 'setname':
                if (!isOwnerB) return aruga.reply(from, `Este comando só pode ser usado pelo Toin!`, id)
                    const setnem = body.slice(9)
                    await aruga.setMyName(setnem)
                    aruga.sendTextWithMentions(from, `Obrigado pelo novo nome @${sender.id.replace('@c.us','')} 😘`)
                break
                case 'read':
                    if (!isGroupMsg) return aruga.reply(from, `Este comando só pode ser usado em grupos!`, id)                
                    if (!quotedMsg) return aruga.reply(from, `Por favor, responda o bot de mensagem`, id)
                    if (!quotedMsgObj.fromMe) return aruga.reply(from, `Por favor, responda o bot de mensagem`, id)
                   try {
                        const reader = await aruga.getMessageReaders(quotedMsgObj.id)
                        let list = ''
                        for (let pembaca of reader) {
                        list += `- @${pembaca.id.replace(/@c.us/g, '')}\n` 
                    }
                        aruga.sendTextWithMentions(from, `Ngeread doangg... Nimbrung kagaa........\n${list}`)
                    } catch(err) {
                        console.log(err)
                        aruga.reply(from, `Desculpe, ninguém leu as mensagens do bot ainda ou desativou os recibos de leitura`, id)    
                    }
                    break
        case 'setstatus':
                if (!isOwnerB) return aruga.reply(from, `Este comando só pode ser usado pelo Toin!`, id)
                    const setstat = body.slice(11)
                    await aruga.setMyStatus(setstat)
                    aruga.sendTextWithMentions(from, `Obrigado pelo novo status @${sender.id.replace('@c.us','')} 😘`)
                break
       
	//Sticker Converter
	case 'stikertoimg':
	case 'stickertoimg':
	case 'toimg':
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                aruga.reply(from, `Calmaer Opohar...`, id)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await aruga.sendFile(from, imageBase64, 'imgsticker.jpg', 'Success!!', id)
                .then(() => {
                    console.log(`Sticker to Image Processed for ${processTime(t, moment())} Seconds`)
                })
        } else if (!quotedMsg) return aruga.reply(from, `Format está errado, marque o adesivo que deseja usar como imagem!`, id)
        break
			
			
        // Sticker Creator
	case 'coolteks':
	case 'cooltext':
            if (args.length == 0) return aruga.reply(from, `Untuk membuat teks keren CoolText pada gambar, gunakan ${prefix}cooltext teks\n\nContoh: ${prefix}cooltext Toin`, id)
		rugaapi.cooltext(args[0])
		.then(async(res) => {
		await aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.text}`, id)
		})
		break
 case 'stickertext':
case 'stikertext':
    if (args.length == 0) return aruga.reply(from, `Membuat Sticker Text\nPemakaian: ${prefix}stickertext [teks]\n\ncontoh: ${prefix}stickertext Toin`, id)
                    await aruga.reply(from, `Wait....`, id)
                console.log('Creating textxgif text...')
                const ltextxgif = body.slice(13)
                await aruga.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${ltextxgif}&apikey=${vhtearkey}`)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
            break
case 'hartatahta':
    if (args.length == 0) return aruga.reply(from, `Membuat Text Gambar Hartatahta\nPemakaian: ${prefix}hartatahta [teks]\n\ncontoh: ${prefix}hartatahta Toin`, id)
                    await aruga.reply(from, `Wait sedang diproses....`, id)
                console.log('Creating Hartatahta text...')
                const lhartatahta = body.slice(12)
                await aruga.sendFileFromUrl(from, `https://api.vhtear.com/hartatahta?text=${lhartatahta}&apikey=${vhtearkey}`, '', 'Nih...', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
            break
 case 'msc':
            if (args.length == 0) return aruga.reply(from, ` Para procurar musicas do youtube\n\nConsumidores: *msc Touch Off`, id)
           try {
                aruga.reply(from, mess.wait, id)
                const serplay = body.slice(6)
                const webplay = await fetch(`https://api.vhtear.com/ytmp3?query=${serplay}&apikey=${vhtearkey}`)
                if (!webplay.ok) throw new Error(`Error Play : ${webplay.statusText}`)
                const webplay2 = await webplay.json()
                 if (webplay2.status == false) {
                    aruga.reply(from, `*Desculpe, ocorreu um erro ao recuperar os dados, selecione outra mídia...*`, id)
                } else {
                   if (Number(webplay2.result.size.split(' MB')[0]) >= 3.00) return aruga.reply(from, 'A duração da música excedeu o limite máximo de 3MB!', id)
                     const { image, mp3, size, ext, title, duration } = await webplay2.result
                    const captplay = `*「 MSC 」*\n\n• *Título* : ${title}\n• *Duração* : ${duration}\n• *Tamanho do arquivo* : ${size}\n• *Exp* : ${ext}\n\n_*A música está sendo enviada....*_`
                    aruga.sendFileFromUrl(from, image, `thumb.jpg`, captplay, id)
                    await aruga.sendFileFromUrl(from, mp3, `${title}.mp3`, '', id).catch(() => aruga.reply(from, mess.error.Yt4, id))
                                  }
            } catch (err) {
                aruga.sendText(ownerNumber, 'Error Play : '+ err)
               aruga.reply(from, 'Não peça a mesma música de antes!', id)
            }
            break 
 case 'lagu':
            if (args.length == 0) return aruga.reply(from, `Untuk mencari lagu dari youtube\n\nPenggunaan: #lagu judul lagu`, id)
           if (!isOwnerBot) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot\n yee iri di sini padahal bisa download lagu lebih dari 30mb:v,klo mau gunain pake *#msc* aja.', id)                     
   try {
                aruga.reply(from, mess.wait, id)
                const serplay = body.slice(6)
                const webplay = await fetch(`https://api.vhtear.com/ytmp3?query=${serplay}&apikey=${vhtearkey}`)
                if (!webplay.ok) throw new Error(`Error Play : ${webplay.statusText}`)
                const webplay2 = await webplay.json()
                 if (webplay2.status == false) {
                    aruga.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                   if (Number(webplay2.result.size.split(' MB')[0]) >= 30.00) return aruga.reply(from, 'Maaf durasi music sudah melebihi batas maksimal 30 MB!', id)
                     const { image, mp3, size, ext, title, duration } = await webplay2.result
                    const captplay = `*「 PLAY 」*\n\n• *Judul* : ${title}\n• *Durasi* : ${duration}\n• *Filesize* : ${size}\n• *Exp* : ${ext}\n\n_*Music Sedang Dikirim....*_`
                    aruga.sendFileFromUrl(from, image, `thumb.jpg`, captplay, id)
                    await aruga.sendFileFromUrl(from, mp3, `${title}.mp3`, '', id).catch(() => aruga.reply(from, mess.error.Yt4, id))
                                  }
            } catch (err) {
                aruga.sendText(ownerNumber, 'Error Play : '+ err)
               aruga.reply(from, 'Jangan meminta lagu yang sama dengan sebelumnya!', id)
            }
            break 
        case 'sticker':
        case 'stiker':
case 'setiker':
case 'seticker':
            if ((isMedia || isQuotedImage) && args.length === 0) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                aruga.sendImageAsSticker(from, imageBase64)
                .then(() => {
                    aruga.reply(from, 'Here\'s your sticker')
                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                })
            } else if (args[0] === 'nobg') {
                if (isMedia || isQuotedImage) {
                    try {
                    var mediaData = await decryptMedia(message, uaOverride)
                    var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    var base64img = imageBase64
                    var outFile = './media/noBg.png'
		            // kamu dapat mengambil api key dari website remove.bg dan ubahnya difolder settings/api.json
                    var result = await removeBackgroundFromImageBase64({ base64img, apiKey: apiNoBg, size: 'auto', type: 'auto', outFile })
                    await fs.writeFile(outFile, result.base64img)
                    await aruga.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                    } catch(err) {
                    console.log(err)
	   	            await aruga.reply(from, 'Maaf website sedang down!', id)
                    }
                }
            } else if (args.length === 1) {
                if (!isUrl(url)) { await aruga.reply(from, 'Maaf, link yang kamu kirim tidak valid.', id) }
                aruga.sendStickerfromUrl(from, url).then((r) => (!r && r !== undefined)
                    ? aruga.sendText(from, 'Maaf, link yang kamu kirim tidak memuat gambar.')
                    : aruga.reply(from, 'Here\'s your sticker')).then(() => console.log(`Sticker Processed for ${processTime(t, moment())} Second`))
            } else {
                await aruga.reply(from, `Tidak ada gambar! Untuk menggunakan ${prefix}sticker\n\n\nKirim gambar dengan caption\n${prefix}sticker <biasa>\n${prefix}sticker nobg <tanpa background>\n\natau Kirim pesan dengan\n${prefix}sticker <link_gambar>`, id)
            }
            break
case 'thundertext':
    if (args.length == 0) return aruga.reply(from, `Membuat Text Gambar thunder\nPemakaian: ${prefix}thundertext [teks]\n\ncontoh: ${prefix}thundertext Toin`, id)
                    await aruga.reply(from, `Wait Sedang di proses....`, id)
                console.log('Creating Thunder text...')
                const lthundertext = body.slice(13)
                await aruga.sendFileFromUrl(from, `https://api.vhtear.com/thundertext?text=${lthundertext}&apikey=${vhtearkey}`, '', 'Nih...', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
            break
case 'slidingtext':
    if (args.length == 0) return aruga.reply(from, `Membuat Text Sliding\nPemakaian: ${prefix}slidingtext [teks]\n\ncontoh: ${prefix}slidingtext Toin`, id)
                    await aruga.reply(from, `Wait Sedang di proses....`, id)
                console.log('Creating slidingtext text...')
                const lslidingtext = body.slice(13)
                await aruga.sendFileFromUrl(from, `https://api.vhtear.com/slidingtext?text=${lslidingtext}&apikey=${vhtearkey}`, '', 'neh....', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
            break

case 'mascotlogo':
    if (args.length == 0) return aruga.reply(from, `Membuat Mascot Giming\nPemakaian: ${prefix}mascotlogo [teks]\n\ncontoh: ${prefix}mascotlogo Toin`, id)
                    await aruga.reply(from, `wait Sedang di proses....`, id)
                console.log('Creating mascotlogo text...')
                const lmascotlogo = body.slice(12)
                await aruga.sendFileFromUrl(from, `https://api.vhtear.com/gamelogo?text=${lmascotlogo}&apikey=${vhtearkey}`, '', 'Nih...', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
            break

case 'infomobil':
            if (args.length == 0) return aruga.reply(from, `Kirim perintah *${prefix}infomobil [ Merek Motor ]*\n\nContoh : *${prefix}infomobil avanza*`, id)
        const mobill = body.slice(11)
        aruga.reply(from, 'Wait sedang diproses...\n\nKalo Kaga Muncul Ada yang salah', id)
        try {
            const datamobill = await axios.get (`https://api.vhtear.com/infomobil?merk=${mobill}&apikey=${vhtearkey}`)
            const { title, spesifikasi, kelebihan, kekurangan, harga, image  } = datamobill.data.result
            const mobilltemu = `*${title}:*\n${spesifikasi}\n\n*Kelebihan:* ${kelebihan}\n\n*Kekurangan:* ${kekurangan}\n\n*Harga:* ${harga}\n\nNyari Doang Beli kaga 🤭\n\nBy : Toin`
            const mobillimage = `${image}`
            aruga.sendImage(from, mobillimage, title, mobilltemu)
                } catch (err) {
                    console.error(err)
                    await aruga.reply(from, `Error!`, id)
                }
            break
        case 'infomotor':
            if (args.length == 0) return aruga.reply(from, `Kirim perintah *${prefix}infomotor [ Merek Motor ]*\n\nContoh : *${prefix}infomotor vario 150*`, id)
        const motoy = body.slice(11)
        aruga.reply(from, 'Wait sedang diproses...\n\nKalo Kaga Muncul Ada yang salah', id)
        try {
            const datamotoy = await axios.get (`https://api.vhtear.com/infomotor?merk=${motoy}&apikey=${vhtearkey}`)
            const { title, spesifikasi, kelebihan, kekurangan, harga, image  } = datamotoy.data.result
            const motoytemu = `*${title}:*\n${spesifikasi}\n\n*Kelebihan:* ${kelebihan}\n\n*Kekurangan:* ${kekurangan}\n\n*Harga:* ${harga}\n\nNyari Doang Beli kaga 🤭\n\nBy : Toin`
            const motoyimage = `${image}`
            aruga.sendImage(from, motoyimage, title, motoytemu)
                } catch (err) {
                    console.error(err)
                    await aruga.reply(from, `Error!`, id)
                }
            break
      case 'logoml':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *#logoml |Hero| Text*,\n\n contoh : *#logoml |layla| Toin*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                aruga.reply(from, `Wait sedang diproses...`, id)
                const lheroml = argz[1]
                const llogoml = argz[2]   
                if (lheroml > 10) return aruga.reply(from, '*Masukin Nama Hero*\n_Contoh : layla_', id)
                if (llogoml > 10) return aruga.reply(from, '*Masukan Text*\n_Maksimal 10 huruf!_', id)
                aruga.sendFileFromUrl(from, `https://api.vhtear.com/logoml?hero=${lheroml}&text=${llogoml}&apikey=${vhtearkey}`)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *#logoml |Hero| Text*,\n\n contoh : *#logoml |layla| Toin*`, id)
            }
 break
case 'virgintext':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *#virgintext |Toin| Dia*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                aruga.reply(from, `Wait sedang diproses...`, id)
                const teks1 = argz[1]
                const teks2 = argz[2]   
                if (teks1 > 7) return aruga.reply(from, '*Masukan text minimal 7 huruf!', id)
                if (teks2 > 7) return aruga.reply(from, '*Masukan Text*\n_Maksimal 7 huruf!_', id)
                aruga.sendFileFromUrl(from, `https://api.vhtear.com/balloonmaker?text1=${teks1}&text2=${teks2}&apikey=${vhtearkey}`)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *#virgintext |Toin| Dia*`, id)
            }
 break
case 'googletext':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *#googletext |Toin|Dia| mantan*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                aruga.reply(from, `Wait sedang diproses...`, id)
                const teks1 = argz[1]
                const teks2 = argz[2]
                const teks3 = argz[3]   
                if (teks1 > 7) return aruga.reply(from, '*Masukan text minimal 7 huruf!', id)
                if (teks2 > 7) return aruga.reply(from, '*Masukan Text*\n_Maksimal 7 huruf!_', id)
                if (teks3 > 7) return aruga.reply(from, '*Masukan Text*\n_Maksimal 7 huruf!_', id)
                aruga.sendFileFromUrl(from, `https://api.vhtear.com/googletext?text1=${teks1}&text2=${teks2}&text3=${teks3}&apikey=${vhtearkey}`)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *#googletext |Toin|Dia| mantan*`, id)
            }
 break
case 'keytext':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *#keytext |Toin|kunci hati hehe*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                aruga.reply(from, `Wait sedang diproses...`, id)
                const teks1 = argz[1]
                const teks2 = argz[2]
                if (teks1 > 7) return aruga.reply(from, '*Masukan text minimal 7 huruf!', id)
                if (teks2 > 7) return aruga.reply(from, '*Masukan Text*\n_Maksimal 7 huruf!_', id)
                         aruga.sendFileFromUrl(from, `https://api.vhtear.com/padlock?text1=${teks1}&text2=${teks2}&apikey=${vhtearkey}`)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *#keytext |Toin|kunci hati hehe*`, id)
            }
 break
case 'Toinff':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *#Toinff |Toin|awas sakit mata*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                aruga.reply(from, `Wait sedang diproses...`, id)
                const teks1 = argz[1]
                const teks2 = argz[2]
                if (teks1 > 7) return aruga.reply(from, '*Masukan text minimal 7 huruf!', id)
                if (teks2 > 7) return aruga.reply(from, '*Masukan Text*\n_Maksimal 7 huruf!_', id)
                         aruga.sendFileFromUrl(from, `https://api.vhtear.com/bannerff?title=${teks1}&text=${teks2}&apikey=${vhtearkey}`)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *#Toinff |Toin|awas sakit mata*`, id)
            }
 break
case 'nulis3':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *#nulis3 contoh : *#nulis3 |Toin|aku males nulis anjg|9B*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 3) {
                aruga.reply(from, `Wait sedang diproses...`, id)
                const nama = argz[1]
                const teks = argz[2]  
                        const kelas = argz[3]   
                 if (nama > 70) return aruga.reply(from, '*Maaf max teks 70!*', id)
                if (kelas > 70) return aruga.reply(from, '*Maaf max teks 70!!*', id)
                if (teks > 70) return aruga.reply(from, '*Maaf max teks 70!*', id)
                aruga.sendFileFromUrl(from, `https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${teks}&tinta=1`)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *#nulis3 |Toin|aku males nulis anjg|9B*`, id)
            }
 break
case 'nulis4':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *#nulis4 contoh : *#nulis4 |Toin|aku males nulis anjg|9B*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 3) {
                aruga.reply(from, `Wait sedang diproses...`, id)
                const nama = argz[1]
                const teks = argz[2]  
                        const kelas = argz[3]   
                 if (nama > 70) return aruga.reply(from, '*Maaf max teks 70!*', id)
                if (kelas > 70) return aruga.reply(from, '*Maaf max teks 70!*', id)
                if (teks > 70) return aruga.reply(from, '*Maaf max teks 70!*', id)
                aruga.sendFileFromUrl(from, `https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${teks}&tinta=2`)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *#nulis4 |Toin|aku males nulis anjg|9B*`, id)
            }
 break
case 'nulis5':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *#nulis5 contoh : *#nulis5 |Toin|aku males nulis anjg|9B*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 3) {
                aruga.reply(from, `Wait sedang diproses....`, id)
                const nama = argz[1]
                const teks = argz[2]  
                        const kelas = argz[3]   
                if (nama > 70) return aruga.reply(from, '*Maaf max teks 70!*', id) 
                if (kelas > 70) return aruga.reply(from, '*Maaf max teks 70!*', id)
                if (teks > 70) return aruga.reply(from, '*Maaf max teks 70!*', id)
                aruga.sendFileFromUrl(from, `https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${teks}&tinta=3`)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *#nulis5 |Toin|aku males nulis anjg|9b*`, id)
            }
 break
case 'nulis6':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *#nulis6 contoh : *#nulis6 |Toin|aku males nulis anjg|9B*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 3) {
                aruga.reply(from, `Wait sedang diproses....`, id)
                const nama = argz[1]
                const teks = argz[2]  
                        const kelas = argz[3]   
                if (nama > 70) return aruga.reply(from, '*Maaf max teks 70!*', id)
                if (kelas > 70) return aruga.reply(from, '*Maaf max teks 70!*', id)
                if (teks > 70) return aruga.reply(from, '*Maaf max teks 70!*', id)
                aruga.sendFileFromUrl(from, `https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${teks}&tinta=4`)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *#nulis6 |Toin|aku males nulis anjg|9B*`, id)
            }
 break
    case 'romancetext':
    if (args.length == 0) return aruga.reply(from, `Membuat Text jadi Gambar ala ala romance\nPemakaian: ${prefix}romancetext [teks]\n\ncontoh: ${prefix}romancetext Toin dan Virgin`, id)
                    await aruga.reply(from, `Wait....`, id)
                console.log('Creating romancetext text...')
                const lpartytext = body.slice(12)
                await aruga.sendFileFromUrl(from, `https://api.vhtear.com/romancetext?text=${lpartytext}&apikey=${vhtearkey}`, '', 'Nih...', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
            break
case 'glowtext':
    if (args.length == 0) return aruga.reply(from, `Membuat Text jadi Gambar ala ala glow\nPemakaian: ${prefix}glowtext [teks]\n\ncontoh: ${prefix}glowtext Toin`, id)
                    await aruga.reply(from, `Wait....`, id)
                console.log('Creating glowtext text...')
                const glowtext = body.slice(10)
                await aruga.sendFileFromUrl(from, `https://api.zeks.xyz/api/glowtext?text=${glowtext}&apikey=apivinz`, '', 'Nih...', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
            break
    case 'silktext':
    if (args.length == 0) return aruga.reply(from, `Membuat Text jadi Gambar Nature\nPemakaian: ${prefix}textmaker [teks]\n\ncontoh: ${prefix}textmaker Toin`, id)
                    await aruga.reply(from, `Wait....`, id)
                console.log('Creating textmaker text...')
                const lsilktext = body.slice(10)
                await aruga.sendFileFromUrl(from, `https://api.vhtear.com/silktext?text=${lsilktext}&apikey=${vhtearkey}`, '', 'Nih...', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
            break

    case 'partytext':
    if (args.length == 0) return aruga.reply(from, `Membuat Text jadi Gambar ala ala party\nPemakaian: ${prefix}partytext [teks]\n\ncontoh: ${prefix}partytext Toin`, id)
                    await aruga.reply(from, `Wait....`, id)
                console.log('Creating partytext text...')
                const llpartytext = body.slice(11)
                await aruga.sendFileFromUrl(from, `https://api.vhtear.com/partytext?text=${llpartytext}&apikey=${vhtearkey}`, '', 'Nih...', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
break
             case 'stickergif':
        case 'stikergif':
case 'gifstiker':
case 'gifsticker':
case 'gif':
            if (isMedia || isQuotedVideo) {
                if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                    var mediaData = await decryptMedia(message, uaOverride)
                    aruga.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 2 min!', id)
                    var filename = `./media/stickergif.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/stickergf.gif --fps=30 --scale=240:240`, async function (error, stdout, stderr) {
                        var gif = await fs.readFileSync('./media/stickergf.gif', { encoding: "base64" })
                        await aruga.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                        .catch(() => {
                            aruga.reply(from, 'Maaf filenya terlalu besar!,mohon kurangi durasi vidio', id)
                        })
                    })
                  } else {
                    aruga.reply(from, `[❗] Kirim vidio dengan caption *${prefix}stickergif* max durasi vidio 9 detik!`, id)
                   }
                } else {
		    aruga.reply(from, `[❗] Kirim vidio dengan caption *${prefix}stickergif*`, id)
	        }
            break                  
        case 'stikergiphy':
        case 'stickergiphy':
            if (args.length !== 1) return aruga.reply(from, `Maaf, format pesan salah.\nKetik pesan dengan ${prefix}stickergiphy <link_giphy>`, id)
            const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
            const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
            if (isGiphy) {
                const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                if (!getGiphyCode) { return aruga.reply(from, 'Gagal mengambil kode giphy', id) }
                const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                aruga.sendGiphyAsSticker(from, smallGifUrl).then(() => {
                    aruga.reply(from, 'Here\'s your sticker')
                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                }).catch((err) => console.log(err))
            } else if (isMediaGiphy) {
                const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                if (!gifUrl) { return aruga.reply(from, 'Gagal mengambil kode giphy', id) }
                const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                aruga.sendGiphyAsSticker(from, smallGifUrl)
                .then(() => {
                    aruga.reply(from, 'Here\'s your sticker')
                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                })
                .catch(() => {
                    aruga.reply(from, `Ada yang error!`, id)
                })
            } else {
                await aruga.reply(from, 'Maaf, command sticker giphy hanya bisa menggunakan link dari giphy.  [Giphy Only]', id)
            }
            break
case 'infobmkg':
axios.get(`https://mnazria.herokuapp.com/api/bmkg-gempa`).then (res => {
	const inidia = `${res.data.result}\n*Saran* : ${res.data.saran}\n\nBy : Toin`
	aruga.sendText(from, inidia, id)
	})
	break
case 'setdesc':
    if (!isGroupAdmins) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh Admin!')
    const descnya = body.slice(9)
    const ganti = await aruga.setGroupDescription(descnya)
        aruga.setGroupDescription(groupId, ganti)
        break
case 'infogempa':
const bmkg = await axios.get('https://tobz-api.herokuapp.com/api/infogempa?apikey=BotWeA').then(res => {
const hasil = `*INFO GEMPA*\n*Lokasi* : _${res.data.lokasi}_\n*Kedalaman* : _${res.data.kedalaman}_\n*Koordinat* : _${res.data.koordinat}_\n*Magnitude* : _${res.data.magnitude}_\n*Waktu* : _${res.data.waktu}_\n${res.data.potensi}\n\nBy : Toin`;
aruga.sendText(from, hasil, id)
}) 
break
        case 'meme':
            if ((isMedia || isQuotedImage) && args.length >= 2) {
                const top = arg.split('|')[0]
                const bottom = arg.split('|')[1]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await meme.custom(getUrl, top, bottom)
                aruga.sendFile(from, ImageBase64, 'image.png', '', null, true)
                    .then(() => {
                        aruga.reply(from, 'Ini makasih!',id)
                    })
                    .catch(() => {
                        aruga.reply(from, 'Ada yang error!')
                    })
            } else {
                await aruga.reply(from, `Tidak ada gambar! Silahkan kirim gambar dengan caption ${prefix}meme <teks_atas> | <teks_bawah>\ncontoh: ${prefix}meme teks atas | teks bawah`, id)
            }
            break
            case 'getmeme':
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/memesbrasil');
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            aruga.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`, id)
            break
        case 'quotemaker':
            const qmaker = body.trim().split('|')
            if (qmaker.length >= 3) {
                const quotes = qmaker[1]
                const author = qmaker[2]
                const theme = qmaker[3]
                aruga.reply(from, 'Proses kak..', id)
                try {
                    const hasilqmaker = await images.quote(quotes, author, theme)
                    aruga.sendFileFromUrl(from, `${hasilqmaker}`, '', 'Ini kak..', id)
                } catch {
                    aruga.reply(from, 'Yahh proses gagal, kakak isinya sudah benar belum?..', id)
                }
            } else {
                aruga.reply(from, `Pemakaian ${prefix}quotemaker |isi quote|author|theme\n\ncontoh: ${prefix}quotemaker |aku sayang kamu|-Toin|random\n\nuntuk theme nya pakai random ya kak..`, id)
            }
            break
        case 'nulis':
            if (args.length == 0) return aruga.reply(from, `Membuat bot menulis teks yang dikirim menjadi gambar\nPemakaian: ${prefix}nulis [teks]\n\ncontoh: ${prefix}nulis i love you 3000`, id)
            const nulisq = body.slice(7)
            const nulisp = await rugaapi.tulis(nulisq)
            await aruga.sendImage(from, `${nulisp}`, '', 'Nih...', id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!,Mohon kurangi teksnya!', id)
            })
            break
case 'nulis7':
            if (args.length == 0) return aruga.reply(from, `Membuat bot menulis teks yang dikirim menjadi gambar\nPemakaian: ${prefix}nulis [teks]\n\ncontoh: ${prefix}nulis i love you 3000`, id)
            const nulisqx = body.slice(7)
            const nulispx = await rugaapi.tulis3(nulisqx)
            await aruga.sendImage(from, `${nulispx}`, '', 'Nih...', id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break

        //Islam Command
        case 'listsurah':
            try {
                axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                .then((response) => {
                    let hehex = '╔══✪〘 List Surah 〙✪══\n'
                    for (let i = 0; i < response.data.data.length; i++) {
                        hehex += '╠➥ '
                        hehex += response.data.data[i].name.transliteration.id.toLowerCase() + '\n'
                            }
                        hehex += '╚═〘 *Toin BOT* 〙'
                    aruga.reply(from, hehex, id)
                })
            } catch(err) {
                aruga.reply(from, err, id)
            }
            break
        case 'infosurah':
            if (args.length == 0) return aruga.reply(from, `*_${prefix}infosurah <nama surah>_*\nMenampilkan informasi lengkap mengenai surah tertentu. Contoh penggunan: ${prefix}infosurah al-baqarah`, message.id)
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                var { data } = responseh.data
                var idx = data.findIndex(function(post, index) {
                  if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                    return true;
                });
                var pesan = ""
                pesan = pesan + "Nama : "+ data[idx].name.transliteration.id + "\n" + "Asma : " +data[idx].name.short+"\n"+"Arti : "+data[idx].name.translation.id+"\n"+"Jumlah ayat : "+data[idx].numberOfVerses+"\n"+"Nomor surah : "+data[idx].number+"\n"+"Jenis : "+data[idx].revelation.id+"\n"+"Keterangan : "+data[idx].tafsir.id
                aruga.reply(from, pesan, message.id)
              break
        case 'surah':
            if (args.length == 0) return aruga.reply(from, `*_${prefix}surah <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1\n\n*_${prefix}surah <nama surah> <ayat> en/id_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Inggris / Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1 id`, message.id)
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                var { data } = responseh.data
                var idx = data.findIndex(function(post, index) {
                  if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                    return true;
                });
                nmr = data[idx].number
                if(!isNaN(nmr)) {
                  var responseh2 = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[1])
                  var {data} = responseh2.data
                  var last = function last(array, n) {
                    if (array == null) return void 0;
                    if (n == null) return array[array.length - 1];
                    return array.slice(Math.max(array.length - n, 0));
                  };
                  bhs = last(args)
                  pesan = ""
                  pesan = pesan + data.text.arab + "\n\n"
                  if(bhs == "en") {
                    pesan = pesan + data.translation.en
                  } else {
                    pesan = pesan + data.translation.id
                  }
                  pesan = pesan + "\n\n(Q.S. "+data.surah.name.transliteration.id+":"+args[1]+")"
                  aruga.reply(from, pesan, message.id)
                }
              break
        case 'tafsir':
            if (args.length == 0) return aruga.reply(from, `*_${prefix}tafsir <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahan dan tafsirnya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}tafsir al-baqarah 1`, message.id)
                var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                var {data} = responsh.data
                var idx = data.findIndex(function(post, index) {
                  if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                    return true;
                });
                nmr = data[idx].number
                if(!isNaN(nmr)) {
                  var responsih = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[1])
                  var {data} = responsih.data
                  pesan = ""
                  pesan = pesan + "Tafsir Q.S. "+data.surah.name.transliteration.id+":"+args[1]+"\n\n"
                  pesan = pesan + data.text.arab + "\n\n"
                  pesan = pesan + "_" + data.translation.id + "_" + "\n\n" +data.tafsir.id.long
                  aruga.reply(from, pesan, message.id)
              }
              break
        case 'alaudio':
            if (args.length == 0) return aruga.reply(from, `*_${prefix}ALaudio <nama surah>_*\nMenampilkan tautan dari audio surah tertentu. Contoh penggunaan : ${prefix}ALaudio al-fatihah\n\n*_${prefix}ALaudio <nama surah> <ayat>_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1\n\n*_${prefix}ALaudio <nama surah> <ayat> en_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Inggris. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1 en`, message.id)
              ayat = "ayat"
              bhs = ""
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                var surah = responseh.data
                var idx = surah.data.findIndex(function(post, index) {
                  if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                    return true;
                });
                nmr = surah.data[idx].number
                if(!isNaN(nmr)) {
                  if(args.length > 2) {
                    ayat = args[1]
                  }
                  if (args.length == 2) {
                    var last = function last(array, n) {
                      if (array == null) return void 0;
                      if (n == null) return array[array.length - 1];
                      return array.slice(Math.max(array.length - n, 0));
                    };
                    ayat = last(args)
                  } 
                  pesan = ""
                  if(isNaN(ayat)) {
                    var responsih2 = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah/'+nmr+'.json')
                    var {name, name_translations, number_of_ayah, number_of_surah,  recitations} = responsih2.data
                    pesan = pesan + "Audio Quran Surah ke-"+number_of_surah+" "+name+" ("+name_translations.ar+") "+ "dengan jumlah "+ number_of_ayah+" ayat\n"
                    pesan = pesan + "Dilantunkan oleh "+recitations[0].name+" : "+recitations[0].audio_url+"\n"
                    pesan = pesan + "Dilantunkan oleh "+recitations[1].name+" : "+recitations[1].audio_url+"\n"
                    pesan = pesan + "Dilantunkan oleh "+recitations[2].name+" : "+recitations[2].audio_url+"\n"
                    aruga.reply(from, pesan, message.id)
                  } else {
                    var responsih2 = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+ayat)
                    var {data} = responsih2.data
                    var last = function last(array, n) {
                      if (array == null) return void 0;
                      if (n == null) return array[array.length - 1];
                      return array.slice(Math.max(array.length - n, 0));
                    };
                    bhs = last(args)
                    pesan = ""
                    pesan = pesan + data.text.arab + "\n\n"
                    if(bhs == "en") {
                      pesan = pesan + data.translation.en
                    } else {
                      pesan = pesan + data.translation.id
                    }
                    pesan = pesan + "\n\n(Q.S. "+data.surah.name.transliteration.id+":"+args[1]+")"
                    await aruga.sendFileFromUrl(from, data.audio.secondary[0])
                    await aruga.reply(from, pesan, message.id)
                  }
              }
              break
       
	//Group All User
	case 'grouplink':
    case 'linkgrup':
            if (!isBotGroupAdmins) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (isGroupMsg) {
                const inviteLink = await aruga.getGroupInviteLink(groupId);
                aruga.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}* Gunakan *${prefix}revoke* untuk mereset Link group`, id)
            } else {
            	aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            }
            break
	case "revoke":
	if (!isBotGroupAdmins) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
  if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (isBotGroupAdmins) {
                        aruga
                            .revokeGroupInviteLink(from)
                            .then((res) => {
                                aruga.reply(from, `Berhasil Revoke Grup Link gunakan *${prefix}grouplink* untuk mendapatkan group invite link yang terbaru`, id);
                            })
                            .catch((err) => {
                                console.log(`[ERR] ${err}`);
                            });
                    }
                    break;
        //Media 
              case 'jadwalbola':
            aruga.reply(from, mess.wait, id)
            try {
                const jdbola = await fetch(`https://api.vhtear.com/jadwalbola&apikey=${vhtearkey}`)
                if (!jdbola.ok) throw new Error(`unexpected response ${jdbola.statusText}`)
                const jdbola2 = await jdbola.json()
                const { data } = await jdbola2.result
                let xixixi = `*「 JADWAL BOLA 」*\n\n`
                for (let i = 0; i < data.length; i++) {
                    xixixi += `\n─────────────────\n\n*Kick-Off* : ${data[i].kickoff}\n*Pertandingan* : ${data[i].pertandingan}\n*Stasiun TV* : ${data[i].stasiuntv}\n\nBy : Toin`
                }
                await aruga.sendText(from, xixixi, id)
            } catch (err) {
                    console.log(err)
                    await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Jadwal tidak ditemukan')
            }
            break
            case 'emojisticker':
                if (args.length !== 1) return aruga.reply(from, `Kirim perintah ${prefix}emojisticker [emoji]\nContoh : ${prefix}emojisticker 😫`, id)
                const emoji = emojiUnicode(q)
                await aruga.reply(from, `Wait....`, id)
                console.log(`Creating code emoji => ${emoji}`)
                aruga.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${vhtearkey}`)
                 .catch ((err) => {
                    console.log(err)
                    aruga.reply(from, 'Maaf, emoji yang kamu kirim tidak support untuk dijadikan sticker, cobalah emoji lain', id)
                })
                break
 case 'emojiimg':
                if (args.length !== 1) return aruga.reply(from, `Kirim perintah ${prefix}emojiimg [emoji]\nContoh : ${prefix}emojiimg 😫`, id)
                const emojic = emojiUnicode(q)
                await aruga.reply(from, `Wait....`, id)
                console.log(`Creating code emoji => ${emojic}`)
                aruga.sendFileFromUrl(from, `https://api.vhtear.com/emojitopng?code=${emojic}&apikey=${vhtearkey}`)
                 .catch ((err) => {
                    console.log(err)
                    aruga.reply(from, 'Maaf, emoji yang kamu kirim tidak support untuk dijadikan img, cobalah emoji lain', id)
                })
                break
            case 'distance':
                if (args.length === 0) return aruga.reply(from, `[❗] Enviar pedidos *${prefix}distance [ Daerah1|Daerah2 ]*\nexemplo : *${prefix}distance Jakarta|Bandung*`, id)
                aruga.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
                try {
                    const dfdc1 = arg.split('|')[0]
                    const dfdc2 = arg.split('|')[1]
                    const dfdcres = await axios.get('https://api.vhtear.com/distance?from='+dfdc1+'&to='+dfdc2+'&apikey='+vhtearkey)
                    const { result } = dfdcres.data
                    await aruga.reply(from, `*「 DISTÂNCIA DE CONDUÇÃO-VOO 」*\n\n${result.data}\n\nBy : Toin`, id)
                } catch (err) {
                    console.error(err.message)
                    await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Desculpe, local não encontrado')
                }
                break
 case 'logoff':
                if (args.length == 0) return aruga.reply(from, `kirim perintah ${prefix}logoff [nama]`, id)
                aruga.reply(from, mess.wait, id)
                const jadiin = body.slice(8)
                const hero = ["alok", "alvaro", "andrew", "anToinio", "caroline", "ford", "hayato", "joseph", "kelly", "laura", "maxim", "miguel", "misa", "moco", "nikita", "notora", "olivia", "paloma", "rafael", "shani", "steffie", "wukong"]
                let awikxs = hero[Math.floor(Math.random() * hero.length)]
                aruga.sendFileFromUrl(from, `https://api.vhtear.com/logoff?hero=${awikxs}&text=${jadiin}&apikey=${vhtearkey}`, `${jadiin}.jpg`, 'nehh ngab...', id)
                break
case 'quotesen':
const qtos = await axios.get(`https://api.vhtear.com/quotes?apikey=${vhtearkey}`).then(res => {
    const fto = `Author : *${res.data.result.author}*\n\nQuotes : *${res.data.result.content}*\n\nBy : Toin`;
    aruga.sendText(from, fto, id)
})
break
case 'cersex':
const qtosw = await axios.get(`https://api.vhtear.com/cerita_sex&apikey=${vhtearkey}`).then(res => {
    const ftof = `*judul* : ~${res.data.result.judul}~\n\n*Cerita :* ${res.data.result.cerita}\n\nBy : Toin`;
    aruga.sendText(from, ftof, id)
})
break
case 'stalktiktok':
            case 'stalktik':
            case 'stalktt':
                if (args.length == 0) return aruga.reply(from, `Untuk men-stalk akun Tiktok seseorang\nUsage ${prefix}stalktiktok [username]\ncontoh : ${prefix}stalktiktok @itsandani`, id)
                const stalktik = await rugaapi.stalktt(args[0])
                const pictt = await rugaapi.ttpict(args[0])
                await aruga.sendFileFromUrl(from, pictt, '', stalktik, id)
                .catch(() => {
                    aruga.reply(from, 'Akun tidak dapat ditemukan...', id)
                })
                break
            case 'gsmarena':
                if (args.length == 0) return aruga.reply(from, `Untuk mencari spefisikasi handphone dari Website GSMArena\nKetik ${prefix}gsmarena [jenishandphone]`, id)
                const gsms = await rugaapi.gsm(args[0])
                const fotox = await rugaapi.gsmpict(args[0])
                await aruga.sendFileFromUrl(from, fotox, '', gsms, id)
                .catch(() => {
                    aruga.reply(from, 'Maaf, Jenis Handphone yang anda cari tidak dapat kami temukan', id)
                })
                break
 case 'ssweb':
case 'ss':
                if (args.length == 0) return aruga.reply(from, `Kirim perintah *${prefix}ssweb [link website] [type]*\n\n*Contoh : #ssweb https://google.com phone*`, id)
                rugaapi.ssweb(args)
                .then(async(res) => {
                    if (res.error) return aruga.sendFileFromUrl(from, `${res.url}`, '', `${res.error}`)
                    await aruga.sendFileFromUrl(from, `${res.data.result}`, 'ss.jpg', 'cekrekkk..', id)
                    .catch(() => {
                        aruga.reply(from, 'error ngabb...', id)
                    })
                })
                break
 case 'twitter':
                if (args.length == 0) return aruga.reply(from, `Kirim Perintah ${prefix}twitter [linktwitter]`, id)
                aruga.reply(from, mess.wait, id)
                rugaapi.twit(args)
                .then(async(res) => {
                    if (res.error) return aruga.reply(from, `${res.url}`, '', `$${res.error}`)
                    await aruga.sendFileFromUrl(from, `${res.getVideo}`, '', '', id)
                    .catch(res => {
                        aruga.reply(from, 'error ngab...', id)
                    })
                })
                break
           
 case 'marvel':
                        if (args.length === 0) return aruga.reply(from, `Format pesan salah\nUsage : ${prefix}marvel Toin|Bot`, id)
                        const txtx1 = arg.split('|')[0]
                        const txtx2 = arg.split('|')[1]
                        axios.get(`http://api.kocakz.xyz/api/textpro/marvelstudio?text1=${txtx1}&text2=${txtx2}`)
                        .then(res => {
                            aruga.sendFileFromUrl(from, res.data.result)
                        })
                        break

                
                case 'glitch':
                    if (args.length === 0) return aruga.reply(from, `Kirim perintah *#glitch [ |Teks1|Teks2 ]*, contoh *#glitch |Toin|Dev Toin*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                aruga.reply(from, mess.wait, id)
                const glitch1 = argz[1]
                const glitch2 = argz[2]
                if (glitch1.length > 10) return aruga.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (glitch2.length > 15) return aruga.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 15 huruf!_', id)
                aruga.sendFileFromUrl(from, `https://api.vhtear.com/glitchtext?text1=${glitch1}&text2=${glitch2}&apikey=${vhtearkey}`)
                           } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *#glitch [ |Teks1|Teks2 ]*, contoh *#glitch |Toin|Dev Toin*`, id)
            }
            break
                   case 'fb':
		case 'facebook':
			if (args.length === 0) return aruga.reply(from, `Kirim perintah *#fb [ Link Fb ]*\nContoh : *#fb https://www.facebook.com/24609282673/posts/10158628585367674/*`, id)
           rugaapi.facebook(args[0])
			.then(async (res) => {
				const { link, linkhd, linksd } = res
				if (res.status == 'error') return aruga.sendFileFromUrl(from, link, '', 'Maaf url anda tidak dapat ditemukan', id)
				await aruga.sendFileFromUrl(from, linkhd, '', 'Nih ngab videonya', id)
				.catch(async () => {
					await aruga.sendFileFromUrl(from, linksd, '', 'Nih ngab videonya', id)
					.catch(() => {
						aruga.reply(from, 'Maaf url anda tidak dapat ditemukan', id)
					})
				})
			})
			break
case 'slot':
                const somtoy = sotoy[Math.floor(Math.random() * (sotoy.length))]    
                const somtoyy = sotoy[Math.floor(Math.random() * (sotoy.length))]   
                const somtoyyy = sotoy[Math.floor(Math.random() * (sotoy.length))]  
                if (somtoyy  == '🍌 : 🍌 : 🍌') {
              aruga.sendText(from, `[ 🎰 SLOTS 🎰 ]\n-----------------\n${somtoy}\n${somtoyy} ◀️\n${somtoyyy}\n-----------------\n[ 🎰 |SLOTS| 🎰 ]\n\n_*PARABÉNS, VOCÊ PODE GANHAR A RECOMPENSA!*_\n\n\n\n\n*TAPI BOONG:V*`, id)
                } else if (somtoyy == '🍒 : 🍒 : 🍒') {
                aruga.sendText(from, `[ 🎰 |SLOTS| 🎰 ]\n-----------------\n${somtoy}\n${somtoyy} ◀️\n${somtoyyy}\n-----------------\n[ 🎰 |SLOTS| 🎰 ]\n\n_*PARABÉNS, VOCÊ PODE GANHAR A RECOMPENSA!*_\n\n\n\n\n*TAPI BOONG:V*`, id)
                } else if (somtoyy == '🔔 : 🔔 : 🔔') {
                aruga.sendText(from, `[ 🎰 |SLOTS| 🎰 ]\n-----------------\n${somtoy}\n${somtoyy} ◀️\n${somtoyyy}\n-----------------\n[ 🎰 |SLOTS| 🎰 ]\n\n_*PARABÉNS, VOCÊ PODE GANHAR A RECOMPENSA!*_\n\n\n\n\n*TAPI BOONG:V*`, id)
                } else if (somtoyy == '🍐 : 🍐 : 🍐') {
                aruga.sendText(from, `[ 🎰 |SLOTS| 🎰 ]\n-----------------\n${somtoy}\n${somtoyy} ◀️\n${somtoyyy}\n-----------------\n[ 🎰 |SLOTS| 🎰 ]\n\n_*PARABÉNS, VOCÊ PODE GANHAR A RECOMPENSA!*_\n\n\n\n\n*TAPI BOONG:V!*`, id)
                } else if (somtoyy == '🍇 : 🍇 : 🍇') {
                aruga.sendText(from, `[ 🎰 |SLOTS| 🎰 ]\n-----------------\n${somtoy}\n${somtoyy} ◀️\n${somtoyyy}\n-----------------\n[ 🎰 |SLOTS| 🎰 ]\n\n_*PARABÉNS, VOCÊ PODE GANHAR A RECOMPENSA!*_\n\n\n\n\n*TAPI BOONG:V*`, id)
                } else {
                aruga.sendText(from, `[ 🎰 |SLOTS| 🎰 ]\n-----------------\n${somtoy}\n${somtoyy} ◀️\n${somtoyyy}\n-----------------\n[ 🎰 |SLOTS| 🎰 ]\n\n`, id)
                }
            break
                    case 'ig':
                        case 'instagram':
                            if (args.length === 0) return aruga.reply(from, `Kirim perintah *#ig [ Link Instagram ]*`, id)
           await aruga.reply(from, mess.wait, id);
            rugaapi.instagram(args[1]).then(async(res) => {
                for (let i = 0; i < res.result.result.length; i++) {
		    if (res.result.result[i].includes('.mp4')) {
                    	var ext = '.mp4'
                    } else {
                        var ext = '.jpg'
               	    }
		  aruga.sendFileFromUrl(from, res.result.result[i], `ig.${ext}`, `*「 INSTAGRAM 」*`, id);
                                }
            }).catch((err) => {
                console.log(err);
                aruga.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
   case 'moddroid':
           if (args.length == 0) return aruga.reply(from, 'Kirim perintah *#moddroid [query]*\nContoh : *#moddroid pou*', id)
            try {
                const moddroid = await axios.get('https://tobz-api.herokuapp.com/api/moddroid?q=' + body.slice(10)  + '&apikey=BotWeA')
                if (moddroid.data.error) return aruga.reply(from, moddroid.data.error, id)
                const modo = moddroid.data.result[0]
                const resmod = `• *Title* : ${modo.title}\n• *Publisher* : ${modo.publisher}\n• *Size* : ${modo.size}\n• *MOD Info* : ${modo.mod_info}\n• *Version* : ${modo.latest_version}\n• *Genre* : ${modo.genre}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}\n\nBy : Toin`
                aruga.sendFileFromUrl(from, modo.image, 'MODDROID.jpg', resmod, id)
            } catch (err) {
                console.log(err)
            }
            break
        case 'happymod':
             if (args.length == 0) return aruga.reply(from, 'Kirim perintah *#happymod [query]*\nContoh : *#happymod pou*', id)
            try {
                const happymod = await axios.get('https://tobz-api.herokuapp.com/api/happymod?q=' + body.slice(10)  + '&apikey=BotWeA')
                if (happymod.data.error) return aruga.reply(from, happymod.data.error, id)
                const modo = happymod.data.result[0]
                const resmod = `• *Title* : ${modo.title}\n• *Purchase* : ${modo.purchase}\n• *Size* : ${modo.size}\n• *Root* : ${modo.root}\n• *Version* : ${modo.version}\n• *Price* : ${modo.price}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}\n\nBy : Toin`
                aruga.sendFileFromUrl(from, modo.image, 'HAPPYMOD.jpg', resmod, id)
            } catch (err) {
                console.log(err)
            }
            break
 case 'loli':
           const loli = await axios.get(`https://api.vhtear.com/randomloli&apikey=${vhtearkey}`)
            const loly = loli.data.result
            aruga.sendFileFromUrl(from, loly.result, 'loli.jpeg', 'Nih....', id)
                       break
                           case 'asupan':
                                if (!isGroupMsg) return await aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam grup!', id)
                                await aruga.reply(from, mess.wait, id)
                                rugaapi.asupan()
                                    .then(async (body) => {
                                        const asupan = body.split('\n')
                                        const asupanx = asupan[Math.floor(Math.random() * asupan.length)]
                                        await aruga.sendFileFromUrl(from, `http://sansekai.my.id/ptl_repost/${asupanx}`, 'asupan.mp4', 'Follow IG: https://www.instagram.com/ptl_repost untuk mendapatkan asupan lebih banyak.', id)
                                        console.log('Success sending video!')
                                    })
                                    .catch(async (err) => {
                                        console.error(err)
                                        await aruga.reply(from, 'Error!', id)
                                    })
                            break 
 case 'pantun':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
            .then(res => res.text())
            .then(body => {
                let splitpantun = body.split('\n')
                let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                aruga.reply(from, randompantun.replace(/aruga-line/g,"\n"), id)
            })
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
 case 'koin':
                const side = Math.floor(Math.random() * 2) + 1
                if (side == 1) {
                  aruga.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
                } else {
                  aruga.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
                }
                break
            case 'dadu':
                const dice = Math.floor(Math.random() * 6) + 1
                await aruga.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
                break

            case 'spamcall2':
case 'spamcall':
                if (args.length !== 1) return aruga.reply(from, `Untuk menggunakan fitur spamcall, ketik :\n${prefix}spamcall 8xxxxxxxxxx\n\nContoh: ${prefix}spamcall 81288888888`, id)
                rugaapi.spamcall(args[0])
                .then(async (res) => {
                    await aruga.reply(from, `${res}\n\nBy : Toin`, id)
                })
                break 
case 'spamsms':
                if (args.length !== 1) return aruga.reply(from, `Untuk menggunakan fitur spamsms, ketik :\n${prefix}spamsms 8xxxxxxxxxx\n\nContoh: ${prefix}spamsms 81288888888`, id)
                rugaapi.spamsms(args[0])
                .then(async (res) => {
                    await aruga.reply(from, `${res}\n\nBy : Toin`, id)
                })
                break 
case 'spamgmail':
                if (args.length !== 1) return aruga.reply(from, `Untuk menggunakan fitur spamgmail, ketik :\n${prefix}spamgmail akungmail\n\nContoh: ${prefix}spamgmail contoh@gmail.com`, id)
                rugaapi.spamgmail(args[0])
                .then(async (res) => {
                    await aruga.reply(from, `${res}\n\nBy : Toin`, id)
                })
                break 
case 'qrread':
        if (args.length !== 1) return aruga.reply(from, `Untuk menggunakan fitur qrread, ketik :\n${prefix}qrread url\n\nContoh: ${prefix}qrcode https://i.ibb.co/phSpp2h/00bed2bb-8b90-4d49-ace1-fe0ac9f73dff.jpg\n\n*Note : Upload terlebih dahaulu qrcode kamu ke https://id.imgbb.com/, kemudian copy url gambar qrcode kamu*`, id)
        aruga.reply(from, `wait...`, id);
        rugaapi.qrread(args[0])
        .then(async (res) => {
          await aruga.reply(from, `${res}`, id)
        })
      break
    case 'qrcode':
        if (args.length !== 2) return aruga.reply(from, `Untuk menggunakan fitur qrcode, ketik :\n${prefix}qrcode [kata/url] [size]\n\nContoh: ${prefix}qrcode https://google.com 300\n\n*Size minimal 100 & maksimal 500*`, id)
        aruga.reply(from, `wait...`, id);
        rugaapi.qrcode(args[0], args[1])
        .then(async (res) => {
          await aruga.sendFileFromUrl(from, `${res}`, id)
        })
      break	
case 'blackpink':

            if (args.length == 0) return aruga.reply(from, `Membuat Gambar Text BlackPink\nPemakaian: ${prefix}blackpink [teks]\n\ncontoh: ${prefix}blackpink Toin`, id)
                await aruga.reply(from, `Wait....`, id)
                console.log('Creating Blackpink text...')
                const lblackpink = body.slice(11)
                await aruga.sendFileFromUrl(from, `https://api.vhtear.com/blackpinkicon?text=${lblackpink}&apikey=${vhtearkey}`, '', 'Nih...', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await aruga.reply(from, `Error!`, id)
                    })
break
case 'ytsearch':
    if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}ytsearch [ Query ]*, Contoh : ${prefix}ytsearch alan walker alone`, id)
    const ytsher = body.slice(10)
    aruga.reply(from, mess.wait, id)
    try {
        const response2 = await fetch(`https://api.vhtear.com/youtube?query=${encodeURIComponent(ytsher)}&apikey=${vhtearkey}`)
        if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
        const jsonserc = await response2.json()
        const { result } = await jsonserc
        let xixixi = `*「 YOUTUBE SEARCH 」*\n\n*Hasil Pencarian : ${ytsher}*\n`
        for (let i = 0; i < result.length; i++) {
            xixixi += `\n─────────────────\n\n• *Judul* : ${result[i].title}\n• *DiToinToin* : ${result[i].views}\n• *Durasi* : ${result[i].duration}\n• *Channel* : ${result[i].channel}\n• *URL* : ${result[i].urlyt}\n\n\nBy : Toin`
        }
        await aruga.sendFileFromUrl(from, result[0].image, 'thumbserc.jpg', xixixi, id)
    } catch (err) {
            console.log(err)
            await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
    }
    break

			
		//Primbon Menu
		case 'cekzodiak':
            if (args.length !== 4) return aruga.reply(from, `Untuk mengecek zodiak, gunakan ${prefix}cekzodiak nama tanggallahir bulanlahir tahunlahir\nContoh: ${prefix}cekzodiak fikri 13 06 2004`, id)
            const cekzodiak = await rugaapi.cekzodiak(args[0],args[1],args[2])
            await aruga.reply(from, cekzodiak, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
		
					
        // Random Kata
      	      case 'urgay':
  case 'howgay':
        		if (args.length == 0) return aruga.reply(from, `Untuk mengetahui seberapa gay seseorang gunakan ${prefix}howgay namanya\n\nContoh: ${prefix}howgay burhan`, id)
            fetch('https://docs-jojo.herokuapp.com/api/twichquote')
            .then(res => res.text())
            .then(body => {
                let splithowgay = body.split('\n')
                let randomhowgay = splithowgay[Math.floor(Math.random() * splithowgay.length)]
                aruga.reply(from, randomhowgay, id)
            })
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
        case 'fakta':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
            .then(res => res.text())
            .then(body => {
                let splitnix = body.split('\n')
                let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                aruga.reply(from, randomnix, id)
            })
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
        case 'katabijak':
case 'motivasi':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
            .then(res => res.text())
            .then(body => {
                let splitbijak = body.split('\n')
                let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
                aruga.reply(from, randombijak, id)
            })
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
break
        case 'fakboy':
case 'bucin':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
            .then(res => res.text())
            .then(body => {
                let splitpantun = body.split('\n')
                let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                aruga.reply(from, randompantun.replace(/aruga-line/g,"\n"), id)
            })
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break

        case 'quote':
            const quotex = await rugaapi.quote()
            await aruga.reply(from, quotex, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
 case 'katacinta':
            const cinta = await rugaapi.cinta()
            await aruga.reply(from, cinta, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
case 'katadilan':
            const dilan = await rugaapi.dilan()
            await aruga.reply(from, dilan, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
case 'katahacker':
            const hemker = await rugaapi.hemker()
            await aruga.reply(from, hemker, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
case 'kataToin':
            const Toin = await rugaapi.Toin()
            await aruga.reply(from, Toin, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
case 'katailham':
            const ham = await rugaapi.ham()
            await aruga.reply(from, ham, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
case 'kodenegara':
            const hame = await rugaapi.hame()
            await aruga.reply(from, hame, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
    		case 'cerpen':
      			rugaapi.cerpen()
      			.then(async (res) => {
		    		await aruga.reply(from, res.result, id)
      			})
		      	break
	     	
	    	case 'puisi':
		      	rugaapi.puisi()
		      	.then(async (res) => {
			    	await aruga.reply(from, res.result, id)
		      	})
		      	break
case 'fucklife':
		      	rugaapi.life()
		      	.then(async (res) => {
			    	await aruga.reply(from, res.result, id)
		      	})
		      	break
case 'bucin2':
		      	rugaapi.bucin2()
		      	.then(async (res) => {
			    	await aruga.reply(from, res.result, id)
		      	})
		      	break


        //Random Images
        case 'anime':
            if (args.length == 0) return aruga.reply(from, `Untuk menggunakan ${prefix}anime\nSilahkan ketik: ${prefix}anime [query]\nContoh: ${prefix}anime random\n\nquery yang tersedia:\nrandom, waifu, husbu, neko`, id)
            if (args[0] == 'random' || args[0] == 'waifu' || args[0] == 'husbu' || args[0] == 'neko') {
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/' + args[0] + '.txt')
                .then(res => res.text())
                .then(body => {
                    let randomnime = body.split('\n')
                    let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
                    aruga.sendFileFromUrl(from, randomnimex, '', 'Nee..', id)
                })
                .catch(() => {
                    aruga.reply(from, 'Ada yang Error!', id)
                })
            } else {
                aruga.reply(from, `Maaf query tidak tersedia. Silahkan ketik ${prefix}anime untuk melihat list query`, id)
            }
            break
        case 'kpop':
            if (args.length == 0) return aruga.reply(from, `Untuk menggunakan ${prefix}kpop\nSilahkan ketik: ${prefix}kpop [query]\nContoh: ${prefix}kpop bts\n\nquery yang tersedia:\nblackpink, exo, bts`, id)
            if (args[0] == 'blackpink' || args[0] == 'exo' || args[0] == 'bts') {
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/' + args[0] + '.txt')
                .then(res => res.text())
                .then(body => {
                    let randomkpop = body.split('\n')
                    let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
                    aruga.sendFileFromUrl(from, randomkpopx, '', 'Nee..', id)
                })
                .catch(() => {
                    aruga.reply(from, 'Ada yang Error!', id)
                })
            } else {
                aruga.reply(from, `Maaf query tidak tersedia. Silahkan ketik ${prefix}kpop untuk melihat list query`, id)
            }
            break
        case 'memes':
            const randmeme = await meme.random()
            aruga.sendFileFromUrl(from, randmeme, '', '', id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
        
        // Search Any
	case 'dewabatch':
		if (args.length == 0) return aruga.reply(from, `Untuk mencari anime batch dari Dewa Batch, ketik ${prefix}dewabatch judul\n\nContoh: ${prefix}dewabatch naruto`, id)
		rugaapi.dewabatch(args[0])
		.then(async(res) => {
		await aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.text}, id`)
		})
        break
    case 'film':
        if (args.length == 0) return aruga.reply(from, `Untuk mencari film dari website LK21, ketik ${prefix}film judulfilm\nContoh : ${prefix}film percy jackson`, id)
        rugaapi.film(args[0])
        .then(async(res) => {
            await aruga.sendFileFromUrl(from, `${res.judul}`, '', `${res.data}, id`)
        })
    case 'kusonime':
        if (args.length == 0) return aruga.reply(from, `Untuk mencari anime batch dari Kusonime, ketik ${prefix}kusonime judul\n\nContih : ${prefix}kusonime naruto`, id)
        rugaapi.kusonime(args[0])
        .then(async(res) => {
            await aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.text}, id`)
        })
        break
case 'kusonime2':
        if (args.length == 0) return aruga.reply(from, `Untuk mencari anime batch dari Kusonime, ketik ${prefix}kusonime2 judul\n\nContih : ${prefix}kusonime naruto`, id)
        rugaapi.kusonime2(args[0])
        .then(async(res) => {
            await aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.text}, id`)
        })
        break
        case 'images':
            if (args.length == 0) return aruga.reply(from, `Untuk mencari gambar dari pinterest\nketik: ${prefix}images [search]\ncontoh: ${prefix}images naruto`, id)
            const cariwall = body.slice(8)
            const hasilwall = await images.fdci(cariwall)
            await aruga.sendFileFromUrl(from, hasilwall, '', '', id)
            .catch(() => {
                aruga.reply(from, 'Error images tidak ditemukan!', id)
            })
            break
        case 'sreddit':
            if (args.length == 0) return aruga.reply(from, `Untuk mencari gambar dari sub reddit\nketik: ${prefix}sreddit [search]\ncontoh: ${prefix}sreddit naruto`, id)
            const carireddit = body.slice(9)
            const hasilreddit = await images.sreddit(carireddit)
            await aruga.sendFileFromUrl(from, hasilreddit, '', '', id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
	    break
        case 'resep':
            if (args.length == 0) return aruga.reply(from, `Untuk mencari resep makanan\nCaranya ketik: ${prefix}resep [search]\n\ncontoh: ${prefix}resep tahu`, id)
            const cariresep = body.slice(7)
            const hasilresep = await resep.resep(cariresep)
            await aruga.reply(from, hasilresep + '\n\nIni kak resep makanannya..', id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
       
           
        case 'wiki':
            if (args.length == 0) return aruga.reply(from, `Untuk mencari suatu kata dari wikipedia\nketik: ${prefix}wiki [kata]`, id)
            const wikip = body.slice(6)
            const wikis = await rugaapi.wiki(wikip)
            await aruga.reply(from, wikis, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break

        case 'cuaca':
            if (args.length == 0) return aruga.reply(from, `Untuk melihat cuaca pada suatu daerah\nketik: ${prefix}cuaca [daerah]`, id)
            const cuacaq = body.slice(7)
            const cuacap = await rugaapi.cuaca(cuacaq)
            await aruga.reply(from, cuacap, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
        
                     
case 'ytmp3'://silahkan kalian custom sendiri jika ada yang ingin diubah
            if (args.length == 0) return aruga.reply(from, `Untuk mendownload lagu dari youtube\n\nPenggunaan: ${prefix}ytmp3 [link yt]`, id)
             try {
                aruga.reply(from, mess.wait, id)
                const serplay = body.slice(6)
                const webplay = await fetch(`https://api.vhtear.com/ytmp3?query=${serplay}&apikey=${vhtearkey}`)
                if (!webplay.ok) throw new Error(`Error Play : ${webplay.statusText}`)
                const webplay2 = await webplay.json()
                 if (webplay2.status == false) {
                    aruga.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(webplay2.result.size.split(' MB')[0]) >= 3.00) return aruga.reply(from, 'Maaf durasi music sudah melebihi batas maksimal 3 MB!', id)
                    const { image, mp3, size, ext, title, duration } = await webplay2.result
                    const captplay = `*「 YTMP3 」*\n\n• *Judul* : ${title}\n• *Durasi* : ${duration}\n• *Filesize* : ${size}\n• *Exp* : ${ext}\n\n_*Music Sedang Dikirim....*_`
                    aruga.sendFileFromUrl(from, image, `thumb.jpg`, captplay, id)
                    await aruga.sendFileFromUrl(from, mp3, `${title}.mp3`, '', id).catch(() => aruga.reply(from, mess.error.Yt4, id))
                                  }
            } catch (err) {
                aruga.sendText(ownerNumber, 'Error Play : '+ err)
               aruga.reply(from, 'Jangan meminta lagu yang sama dengan sebelumnya!', id)
            }
break
case 'ytmp4':
if (args.length == 0) return aruga.reply(from, `Untuk mendownload vidio dari youtube\nketik: ${prefix}ytmp4 [link_yt]`, id)
              const isLin = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
            if (!isLin) return aruga.reply(from, mess.error.Iv, id)
            try {
                aruga.reply(from, mess.wait, id)
                const ytvh = await axios.get(`https://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtearkey}`)
                if (!ytvh.ok) throw new Error(`Error YTMP4 : ${ytvh.statusText}`)
                const ytvh2 = await ytvh.json()
                 if (ytvh2.status == false) {
                    aruga.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(ytvh2.result.size.split('MB')[0]) > 5.00) return aruga.sendFileFromUrl(from, ytvh2.result.imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${ytvh2.result.title}\n• *Filesize* : ${ytvh2.result.size}\n\n__Maaf, Durasi video melebihi 5 MB. Silahkan download video melalui link dibawah_.\n${ytvh2.result.UrlVideo}`, id)
                    const { title, UrlVideo, imgUrl, size, status, ext } = await ytvh2.result
                    console.log(`VHTEAR : ${ext}\n${size}\n${status}`)
                    aruga.sendFileFromUrl(from, imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`, id)
                    await aruga.sendFileFromUrl(from, UrlVideo, `${title}.mp4`, '', id).catch(() => aruga.reply(from, mess.error.Yt4, id))
                                }
            } catch (err) {
               aruga.sendText(ownerNumber, 'Error ytmp4 : '+ err)
               aruga.reply(from, 'Maaf server sedang error!', id)
            }
            break
  case 'mapz'://by aqulz
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}mapz [optional]*, Contoh : *${prefix}maps Jakarta*`, id)
            const mapz = body.slice(6)
            try {
            const mapz2 = await axios.get('https://mnazria.herokuapp.com/api/maps?search=' + mapz)
            const { gambar } = mapz2.data
            const pictk = await bent("buffer")(gambar)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            aruga.sendImage(from, base64, 'maps.jpg', `*Hasil Maps : ${mapz}*`)
            } catch (err) {
             console.error(err.message)
             await aruga.reply(from, '💔️ Maaf, error', id)
             aruga.sendText(ownerNumber, 'Error Maps : '+ err)
           }
          break
  case 'lion'://by aqulzz
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}lion [ |Teks1|Teks2 ]*, contoh *${prefix}lion |Toin|ToinBot*`, id)
            argz = body.trim().split('|')
            if (argz.length === 3) {
                await aruga.reply(from, 'Tunggu sebentar dan pastikan format yang anda masukkan benar', id)
                const lion1 = argz[1]
                const lion2 = argz[2]
                const loin = await axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=lionlogo&text1=${lion1}&text2=${lion2}&apikey=BotWeA`)
                aruga.sendFileFromUrl(from, loin.data.result, 'loin.jpg', 'neh bang', id)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}lion [ |Teks1|Teks2 ]*, contoh *${prefix}lion |Toin|ToinBot*`, id)
            }
            break
    case 'wolf2'://by aqulzz
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}wolf2 [ |Teks1|Teks2 ]*, contoh *${prefix}wolf2 |Toin|ToinBot*`, id)
            argz = body.trim().split('|')
            if (argz.length === 3) {
                aruga.reply(from, 'Tunggu sebentar dan pastikan format yang anda masukkan benar', id)
                const wolf12 = argz[1]
                const wolf22 = argz[2]
                const wolf2 = await axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=wolflogo2&text1=${wolf12}&text2=${wolf22}&apikey=BotWeA`)
                aruga.sendFileFromUrl(from, wolf2.data.result, 'wolf2.jpg', 'neh bang', id)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}wolf2 [ |Teks1|Teks2 ]*, contoh *${prefix}wolf2 |Toin|ToinBot*`, id)
            }
            break
	
    case 'wolf'://by aqulzz
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}wolf [ |Teks1|Teks2 ]*, contoh *${prefix}wolf |Toin|ToinBot*`, id)
            argz = body.trim().split('|')
            if (argz.length === 3) {
                aruga.reply(from, 'Tunggu sebentar dan pastikan format yang anda masukkan benar', id)
                const wolf1 = argz[1]
                const wolf2 = argz[2]
                const wolf = await axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=wolflogo1&text1=${wolf1}&text2=${wolf2}&apikey=BotWeA`)
                aruga.sendFileFromUrl(from, wolf.data.result, 'wolf.jpg', 'neh bang', id)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}wolf [ |Teks1|Teks2 ]*, contoh *${prefix}wolf |Toin|ToinBot*`, id)
            }
break
 case 'textpubg'://by Toin
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}textpubg [ |Teks1|Teks2 ]*, contoh *${prefix}textpubg |Toin|ToinBot*`, id)
            argz = body.trim().split('|')
            if (argz.length === 3) {
                aruga.reply(from, 'Tunggu sebentar dan pastikan format yang anda masukkan benar', id)
                const pbg1 = argz[1]
                const pbg2 = argz[2]
                const pbg = await axios.get(`http://api.itsmeikyxsec404.xyz/pubg?apikey=itsmeiky633&text1=${pbg1}&text2=${pbg2}`)
                aruga.sendFileFromUrl(from, pbg.data.result, 'pbg.jpg', 'neh bang', id)
            } else {
                await aruga.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}textpubg [ |Teks1|Teks2 ]*, contoh *${prefix}textpubg |Toin|ToinBot*`, id)
            }
break
   
case 'alkitab':
            if (args.length == 0) return aruga.reply(from, `Kirim perintah *${prefix}alkitab* [ Ayat ]\n\n*Contoh :* ${prefix}alkitab matius`, id)
            const alkitabx = body.slice(9)
            aruga.reply(from, 'Wait.....', id)
            try {
                const dataplai = await axios.get(`https://docs-jojo.herokuapp.com/api/alkitabsearch?q=${alkitabx}`)
                const dataplay = dataplai.data
                 let alkitabb = `*「 ALKITAB SEARCH 」*\n\n*Hasil Pencarian:* ${alkitabx}\n`
                for (let i = 0; i < dataplay.result.length; i++) {
                    alkitabb += `\n─────────────────\n\n• *Ayat* : ${dataplay.result[i].ayat}\n• *Isi* : ${dataplay.result[i].isi}\n\nBy : Toin\n`
                }
                await aruga.reply(from, alkitabb, id)
            } catch (err){
                console.log(err)
            }
            break
   		case 'movie':
				if (args.length == 0) return aruga.reply(from, `Untuk mencari suatu film dari website Bajakan:v\n${prefix}movie the uncanny counter`, id)
				await aruga.reply(from, mess.wait, id)
				rugaapi.movie(args)
				.then(async ({ result }) => {
					let mov = '*-----「 MOVIE 」-----*'
					for (let i = 0; i < result.length; i++) {
						mov += `\n\n• *Judul :* ${result[i].title}\n• *URL Download :* ${result[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\n By : Toin`
					}
					await aruga.sendFileFromUrl(from, result[0].thumb, 'thumb.jpg', mov, id)
					console.log('Success sending Movie from query')
				})
				.catch(async (err) => {
					console.error(err)
					await aruga.reply(from, 'Error!', id)
				})
				break
        case 'whatanime':
case 'wait':
                  if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                aruga.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                	if (resolt.docs && resolt.docs.length <= 0) {
                		aruga.reply(from, 'Maaf, saya tidak tau ini anime apa, pastikan gambar yang akan di Search tidak Buram/KepoToing', id)
                	}
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                    	teks = '*Saya tidak menjamin semua ini pas* :\n\n'
                    }
                    teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n\nBy : Toin\n`
                    teks += `➸ *R-18?* : ${is_adult}\n`
                    teks += `➸ *Eps* : ${episode.toString()}\n`
                    teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    aruga.sendFileFromUrl(from, video, 'anime.mp4', teks, id).catch(() => {
                        aruga.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    aruga.reply(from, 'Ada yang Error!', id)
                })
            } else {
				aruga.reply(from, `Maaf format salah\n\nSilahkan kirim foto dengan caption ${prefix}wait\n\nAtau reply foto dengan caption ${prefix}wait`, id)
			}
            break
        // Other Command
        case 'resi':
            if (args.length !== 2) return aruga.reply(from, `Maaf, format pesan salah.\nSilahkan ketik pesan dengan ${prefix}resi <kurir> <no_resi>\n\nKurir yang tersedia:\njne, pos, tiki, wahana, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, lion, idl, rex`, id)
            const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex']
            if (!kurirs.includes(args[0])) return aruga.sendText(from, `Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`)
            console.log('Memeriksa No Resi', args[1], 'dengan ekspedisi', args[0])
            cekResi(args[0], args[1]).then((result) => aruga.sendText(from, result))
            break
        case 'tts':
            if (args.length == 0) return aruga.reply(from, `Mengubah teks menjadi sound (google voice)\nketik: ${prefix}tts <kode_bahasa> <teks>\ncontoh : ${prefix}tts id halo\nuntuk kode bahasa cek disini : https://anotepad.com/note/read/5xqahdy8`, id)
            const ttsGB = require('node-gtts')(args[0])
            const dataText = body.slice(8)
                if (dataText === '') return aruga.reply(from, 'apa teksnya ngab..', id)
                try {
                    ttsGB.save('./media/tts.mp3', dataText, function () {
                    aruga.sendPtt(from, './media/tts.mp3', id)
                    })
                } catch (err) {
                    aruga.reply(from, err, id)
                }
            break
        case 'translate':
            if (args.length != 1) return aruga.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption ${prefix}translate <kode_bahasa>\ncontoh ${prefix}translate id`, id)
            if (!quotedMsg) return aruga.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption ${prefix}translate <kode_bahasa>\ncontoh ${prefix}translate id`, id)
            const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
            translate(quoteText, args[0])
                .then((result) => aruga.sendText(from, result))
                .catch(() => aruga.sendText(from, 'Error, Kode bahasa salah.'))
            break
		case 'covidindo':
			rugaapi.covidindo()
			.then(async (res) => {
				await aruga.reply(from, `${res}\n\nBy : Toin`, id)
			})
			break
        case 'ceklokasi':
            if (quotedMsg.type !== 'location') return aruga.reply(from, `Maaf, format pesan salah.\nKirimkan lokasi dan reply dengan caption ${prefix}ceklokasi`, id)
            console.log(`Request Status Zona Penyebaran Covid-19 (${quotedMsg.lat}, ${quotedMsg.lng}).`)
            const zoneStatus = await getLocationData(quotedMsg.lat, quotedMsg.lng)
            if (zoneStatus.kode !== 200) aruga.sendText(from, 'Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
            let datax = ''
            for (let i = 0; i < zoneStatus.data.length; i++) {
                const { zone, region } = zoneStatus.data[i]
                const _zone = zone == 'green' ? 'Hijau* (Aman) \n' : zone == 'yellow' ? 'Kuning* (Waspada) \n' : 'Merah* (Bahaya) \n'
                datax += `${i + 1}. Kel. *${region}* Berstatus *Zona ${_zone}`
            }
            const text = `*CEK LOKASI PENYEBARAN COVID-19*\nHasil pemeriksaan dari lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${datax}`
            aruga.sendText(from, text)
            break
        case 'shortlink':
            if (args.length == 0) return aruga.reply(from, `ketik ${prefix}shortlink <url>`, id)
            if (!isUrl(args[0])) return aruga.reply(from, 'Maaf, url yang kamu kirim tidak valid.', id)
            const shortlink = await urlShortener(args[0])
            await aruga.sendText(from, shortlink)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
		case 'bapakfont':
 case 'Toinfont':
			if (args.length == 0) return aruga.reply(from, `Mengubah kalimat menjadi alay\n\nketik ${prefix}Toinfont kalimat`, id)
			rugaapi.bapakfont(body.slice(11))
			.then(async(res) => {
				await aruga.reply(from, `${res}`, id)
			})
			break
 case 'Toinback':
			if (args.length == 0) return aruga.reply(from, `Mengubah kalimat menjadi kebalik\n\nketik ${prefix}Toinback kalimat`, id)
			rugaapi.back(body.slice(10))
			.then(async(res) => {
				await aruga.reply(from, `${res}`, id)
			})
			break
 case 'hitunghuruf':
			if (args.length == 0) return aruga.reply(from, `Menghitung huruf di kata\n\nketik ${prefix}hitunghuruf kalimat`, id)
			rugaapi.huruf(body.slice(13))
			.then(async(res) => {
				await aruga.reply(from, `${res}`, id)
			})
			break
		
		//Fun Menu
        case 'klasemen':
		case 'klasmen':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
			const klasemen = db.get('group').filter({id: groupId}).map('members').value()[0]
            let urut = Object.entries(klasemen).map(([key, val]) => ({id: key, ...val})).sort((a, b) => b.denda - a.denda);
            let textKlas = "*Klasemen Denda Sementara*\n"
            let i = 1;
            urut.forEach((klsmn) => {
            textKlas += i+". @"+klsmn.id.replace('@c.us', '')+" ➤ Rp"+formatin(klsmn.denda)+"\n"
            i++
            });
            await aruga.sendTextWithMentions(from, textKlas)
			break

        // Group Commands (group admin only)
	    case 'add':
            if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini, jadiin gua admin', id)
	        if (args.length !== 1) return aruga.reply(from, `Untuk menggunakan ${prefix}add\nPenggunaan: ${prefix}add <nomor>\ncontoh: ${prefix}add 628xxx`, id)
                try {
                    await aruga.addParticipant(from,`${args[0]}@c.us`)
                } catch {
                    aruga.reply(from, 'Target hilang diradar, Enemies Ahead!', id)
                }
            break
        case 'kick':
            if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini, jadiin gw admin', id)
            if (mentionedJidList.length === 0) return aruga.reply(from, 'Maaf, format pesan salah.\nSilahkan tag satu atau lebih orang yang akan dikeluarkan', id)
            if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mengeluarkan akun bot sendiri', id)
            await aruga.sendTextWithMentions(from, `Done!, mengeluarkan ${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await aruga.sendText(from, 'tititttt admin tidak bisa di kick!')
                await aruga.removeParticipant(groupId, mentionedJidList[i])
            }
            break
            case 'promote':
                if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                if (!isGroupAdmins) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin', id)
                if (!isBotGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini jadiin gw admin', id)
                if (mentionedJidList.length !== 1) return aruga.reply(from, 'Maaf, hanya bisa mempromote 1 user', id)
                if (groupAdmins.includes(mentionedJidList[0])) return await aruga.reply(from, 'GOBLOG, tuh anak udah jadi admin bego.', id)
                if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mempromote akun bot sendiri', id)
                await aruga.promoteParticipant(groupId, mentionedJidList[0])
                await aruga.sendTextWithMentions(from, `Done, ciee, @${mentionedJidList[0].replace('@c.us', '')} Jadi admin`)
                break
            case 'demote':
                if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin', id)
                if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini, jadiin gw admin', id)
                if (mentionedJidList.length !== 1) return aruga.reply(from, 'Maaf, hanya bisa mendemote 1 user', id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await aruga.reply(from, 'GOBLOG, tuh anak udah belom jadi admin mau lu demote. mana bisa tolol.', id)
                if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mendemote akun bot sendiri', id)
                await aruga.demoteParticipant(groupId, mentionedJidList[0])
                await aruga.sendTextWithMentions(from, `Done,\n@${mentionedJidList[0].replace('@c.us', '')} Halo member baru..`)
                break
            case 'bye':
                if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin', id)
                aruga.sendText(from, 'Jahat kelen sama aku... ( ⇀‸↼‶ )').then(() => aruga.leaveGroup(groupId))
                break
            case 'del':
case 'delete':
 if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
if (!isGroupAdmins & !isOwnerB) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        if (!quotedMsg) return aruga.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
                if (!quotedMsgObj.fromMe) return aruga.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
                aruga.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break
        case 'sandwriting':
            if (args.length === 0)  return aruga.reply(from, `Kirim perintah *${prefix}sandwriting [ Teks ]*\nContoh *${prefix}sandwriting ToinBot*`, id)
            const swrt = body.slice(13)
            try {
            const swrt2 = await axios.get('https://api.vhtear.com/sand_writing?text1=' + swrt + '&apikey=' + vhtearkey)
            const { imgUrl } = swrt2.data.result
            const swrt3 = `*「 SAND WRITING 」*
*Text : ${swrt}*`
            const pictk = await bent("buffer")(imgUrl)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            aruga.sendImage(from, base64, swrt3)
            } catch (err) {
             console.error(err.message)
             await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan', id)
             aruga.sendText(from, 'Sand Writing Error : ' + err)
           }
          break
        case 'artimimpi':
            if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}artimimpi [mimpi]*\nContoh : *${prefix}artimimpi ular*`, id)
            try {
            const resp = await axios.get('https://api.vhtear.com/artimimpi?query=' + body.slice(10) + '&apikey=' + vhtearkey)
            if (resp.data.error) return aruga.reply(from, resp.data.error, id)
            const anm2 = `➸ Artimimpi : ${resp.data.result.hasil}\n\nBy : Toin`
            aruga.reply(from, anm2, id)
            } catch (err) {
                console.error(err.message)
                await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Mimpi tidak ditemukan', id)
                aruga.sendText(from, 'Artimimpi Error : ' + err)
           }
            break
        case 'tahta':
case 'harta':
             const jreng = body.slice(7)
             if (!jreng) return aruga.reply(from, `Kirim perintah *${prefix}tahta [teks]*\n\nContoh *${prefix}tahta Toin*`, id)
             if (jreng.length > 7) return aruga.reply(from, 'Maksimal 7 Huruf!', id)
             aruga.sendText(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
             await aruga.sendFileFromUrl(from, `https://api.vhtear.com/hartatahta?text=${jreng}&apikey=${vhtearkey}`,`${jreng}.jpg`,`Harta Tahta ${jreng}`, id)        
             break
        case 'family100':
            try {
            const resp = await axios.get('https://api.vhtear.com/family100&apikey=' + vhtearkey)
            if (resp.data.error) return aruga.reply(from, resp.data.error, id)
            const anm2 = `➸ Soal : ${resp.data.result.soal}\n_Silahkan DiJawab_`
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}\n\nBy : Toin`
            aruga.reply(from, anm2, id)
            aruga.sendText(from, `30 Detik Lagi...`, id)
           await sleep(20000)
            aruga.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10500)
            aruga.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            aruga.reply(from, jwban, id)
            } catch (err) {
                console.error(err.message)
                await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                aruga.sendText(ownerNumber, 'Family100 Error : ' + err)
           }
           break
           case 'tiktokpic':
                if (args.length == 0) return await aruga.reply(from, `Untuk mendapatkan foto dari username tiktok\nUsage : ${prefix}tiktokpic itsandani`, id)
                const namaih = body.slice(11)
                await aruga.reply(from, mess.wait, id)
                try {
                    console.log(`Getting profile pic for ${namaih}`)
                    const tkt = await axios.get(`https://docs-jojo.herokuapp.com/api/tiktokpic?user=${namaih}`)
                    if (tkt.data.error) return aruga.reply(from, tkt.data.error, id)
                    await aruga.sendFileFromUrl(from, tkt.data.result, 'tiktokpic.jpg', 'Ini :D', id)
                    console.log('Success sending TikTok profile pic!')
                } catch (err) {
                    console.error(err)
                    await aruga.reply(from, 'Error!', id)
                }
            break
        
        case 'edotensei':
            if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
    if (!isGroupAdmins & !isOwnerB) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                      if (!isBotGroupAdmins) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return aruga.reply(from, 'Fitur untuk menghapus member lalu menambahkan member kembali,kirim perintah ${prefix}edotensei @tagmember', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return aruga.reply(from, mess.error.Ki, id)
                if (ownerNumber.includes(mentionedJidList[i])) return aruga.reply(from, 'Tidak bisa mengeluarkan owner Bot')
                await aruga.removeParticipant(groupId, mentionedJidList[i])
                await sleep(1000)
                await aruga.addParticipant(from,`${mentionedJidList}`)
            } 
            break
        case 'infoall':
        case 'everyone':
case 'tagall':
            if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins & !isOwnerB) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            const textInfo = body.slice(8)
            const namagcnih = name
            const memchu = chat.groupMetadata.participants.length
            const groupMem = await aruga.getGroupMembers(groupId)
            let hehex = `Name Group : *${namagcnih}*\n\nTotal Members : *${memchu}*\n\n╔══✪〘 Mention All 〙✪══\n\n`
            for (let i = 0; i < groupMem.length; i++) {
                hehex += '╠➥'
                hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehex += '╚═〘 *Toin INFO* 〙'
            await aruga.sendTextWithMentions(from, `Info dari : ${pushname}\n` + textInfo+ '\n\n' +hehex)
            break
		case 'katakasar':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
			aruga.reply(from, `Untuk mengaktifkan Fitur Kata Kasar pada Group Chat\n\nApasih kegunaan Fitur Ini? Apabila seseorang mengucapkan kata kasar akan mendapatkan denda\n\nPenggunaan\n${prefix}kasar on --mengaktifkan\n${prefix}kasar off --nonaktifkan\n\n${prefix}reset --reset jumlah denda`, id)
			break
		case 'kasar':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
			if (args.length !== 1) return aruga.reply(from, `Untuk mengaktifkan Fitur Kata Kasar pada Group Chat\n\nApasih kegunaan Fitur Ini? Apabila seseorang mengucapkan kata kasar akan mendapatkan denda\n\nPenggunaan\n${prefix}kasar on --mengaktifkan\n${prefix}kasar off --nonaktifkan\n\n${prefix}reset --reset jumlah denda`, id)
			if (args[0] == 'on') {
				ngegas.push(chatId)
				fs.writeFileSync('./settings/ngegas.json', JSON.stringify(ngegas))
				aruga.reply(from, 'Fitur Anti Kasar sudah di Aktifkan', id)
			} else if (args[0] == 'off') {
				let nixx = ngegas.indexOf(chatId)
				ngegas.splice(nixx, 1)
				fs.writeFileSync('./settings/ngegas.json', JSON.stringify(ngegas))
				aruga.reply(from, 'Fitur Anti Kasar sudah di non-Aktifkan', id)
			} else {
				aruga.reply(from, `Untuk mengaktifkan Fitur Kata Kasar pada Group Chat\n\nApasih kegunaan Fitur Ini? Apabila seseorang mengucapkan kata kasar akan mendapatkan denda\n\nPenggunaan\n${prefix}kasar on --mengaktifkan\n${prefix}kasar off --nonaktifkan\n\n${prefix}reset --reset jumlah denda`, id)
			}
			break
		case 'reset':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
			const reset = db.get('group').find({ id: groupId }).assign({ members: []}).write()
            if(reset){
				await aruga.sendText(from, "Klasemen telah direset.")
            }
			break
		case 'mutegrup':
case 'mutegroup':
case 'mutegrub':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
			if (args.length !== 1) return aruga.reply(from, `Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n${prefix}mutegrup on --aktifkan\n${prefix}mutegrup off --nonaktifkan`, id)
            if (args[0] == 'on') {
				aruga.setGroupToAdminsOnly(groupId, true).then(() => aruga.sendText(from, 'Berhasil mengubah agar hanya admin yang dapat chat!'))
			} else if (args[0] == 'off') {
				aruga.setGroupToAdminsOnly(groupId, false).then(() => aruga.sendText(from, 'Berhasil mengubah agar semua anggota dapat chat!'))
			} else {
				aruga.reply(from, `Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n${prefix}mutegrup on --aktifkan\n${prefix}mutegrup off --nonaktifkan`, id)
			}
			break
		case 'seticon':
case 'setprofile':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
			if (isMedia && type == 'image' || isQuotedImage) {
				const dataMedia = isQuotedImage ? quotedMsg : message
				const _mimetype = dataMedia.mimetype
				const mediaData = await decryptMedia(dataMedia, uaOverride)
				const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
				await aruga.setGroupIcon(groupId, imageBase64)
			} else if (args.length === 1) {
				if (!isUrl(url)) { await aruga.reply(from, 'Maaf, link yang kamu kirim tidak valid.', id) }
				aruga.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined)
				? aruga.reply(from, 'Maaf, link yang kamu kirim tidak memuat gambar.', id)
				: aruga.reply(from, 'Berhasil mengubah profile group', id))
			} else {
				aruga.reply(from, `Commands ini digunakan untuk mengganti icon/profile group chat\n\n\nPenggunaan:\n1. Silahkan kirim/reply sebuah gambar dengan caption ${prefix}setprofile\n\n2. Silahkan ketik ${prefix}setprofile linkImage`)
			}
            break
            case 'ship':
            lvak = body.trim().split(' ')
			if (args.length == 2) {
				await aruga.sendTextWithMentions(from, '❤️ ' + lvak[1] + ' tem um chance de ' + lvpc + '% de namorar ' + lvak[2] + '. 👩‍❤️‍👨')
            } else {
				await aruga.reply(from, 'Faltou marcar o casal de pombinhos!', id)
            }
			break	
			

        case 'gay':
            gaak = body.trim().split(' ')
    	    var lgbt = ["lésbica", "gay", "bissexual", "transgenero", "queer", "intersexual", "pedro-sexual", "negrosexual", "helicoptero sexual", "ageneros", "androgino", "assexual", "macaco-sexual", "dedo-sexual", "Sexo-Inexplicavel", "predio-sexual", "sexual-não-sexual", "pansexual", "kink", "incestuoso", "comedor-de-casadas", "unicornio-sexual", "maniaco-sexual"]
    	    var guei = lgbt[Math.floor(Math.random() * lgbt.length)]
			if (args.length == 1) {
				await aruga.sendTextWithMentions(from, gaak[1] + ' é ' + lvpc + '% ' + guei + '.')
            } else {
				await aruga.reply(from, `Você é ` + lvpc + '% ' + guei + '.', id)
            }
            break
            case 'pau':
            gaak = body.trim().split(' ')
    	    var pau = ["8=D Minusculor kskst", "8===D eeeh na mediar", "8========D Enormer eitar","8D Carai viado do a cabeçar kskst","8====> so a fimoser","Ti legalmente nasceu sem pau","Voce tem busetar"]
    	    var guei1 = pau[Math.floor(Math.random() * pau.length)]
			if (args.length == 1) {
				await aruga.sendTextWithMentions(from, gaak[1] + ' Seu pau e ' + guei1 + '.')
            } else {
				await aruga.reply(from, `Seu pau e ` + guei1 + '.', id)
            }
			break
			

		case 'chance':
			if (args.length == 0) return aruga.reply(from, 'Defina algo para analisar.', id)
			await aruga.reply(from, `_De acordo com meus calculos super avançados de ~macaco femea~ robô "cuie" a chance de..._ \n\n*"${body.slice(8)}"*\n\n_...ser realidade é de_ *${lvpc}%.*`, id)
			break


        case 'kiss':
            arqa = body.trim().split(' ')
			if (args.length == 1) {
				const persona = author.replace('@c.us', '')
				aruga.sendTextWithMentions(from, 'Minha nossa! @' + persona + ' deu um beijo em ' + arqa[1] + ' !')
				if (double == 1) {
				await aruga.sendGiphyAsSticker(from, 'https://media.giphy.com/media/vUrwEOLtBUnJe/giphy.gif')
				} else {
				await aruga.sendGiphyAsSticker(from, 'https://media.giphy.com/media/1wmtU5YhqqDKg/giphy.gif')
				}
			} else {
				await aruga.reply(from, 'Marque ~apenas uma~ a pessoa quem você quer beijar hihihi', id)
            }
			break


        case 'tapa':
            arq = body.trim().split(' ')
            const person = author.replace('@c.us', '')
            await aruga.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
            aruga.sendTextWithMentions(from, '@' + person + ' *deu um tapa em* ' + arq[1])
            break
            case 'morte':
		case 'death':
            if (args.length == 0) return aruga.reply(from, 'Coloque um nome, apenas um, nada de sobrenome ou nomes inteiros, ainda mais por sua segurança!', id)
			const predea = await axios.get(`https://api.agify.io/?name=${args[0]}`)
			await aruga.reply(from, `Pessoas com este nome "${predea.data.name}" tendem a morrer aos ${predea.data.age} anos de idade.`, id)
			break			
			
			
	    case 'oculto':
            if (!isGroupMsg) return aruga.reply(from, 'Apenas grupos!', id)
            const eur = await aruga.getGroupMembers(groupId)
            const surpresa = eur[Math.floor(Math.random() * eur.length)]
			console.log(surpresa.id)
    	    var xvid = ["Negoes branquelos e feministas", `${pushname} se depilando na banheira`, `${pushname} comendo meu cuzinho`, `${pushname} quer me comer o que fazer?`, "lolis nuas e safadas", "Ursinhos Mansos Peludos e excitados", "mae do adm cozida na pressao", "Buceta de 500 cm inflavel da boneca chinesa lolita company", "corno manso batendo uma pra mim com meu rosto na webcam", "tigresa vip da buceta de mel", "belle delphine dando o cuzinho no barzinho da esquina", "fazendo anal no negao", "africanos nus e chupando pau", "anal africano", "comendo a minha tia", "lgbts fazendo ahegao", "adm gostoso tirando a roupa", "gays puxando o intestino pra fora", "Gore de porno de cachorro", "anoes baixinhos do pau grandao", "Anões Gays Dotados Peludos", "anões gays dotados penetradores de botas", "Ursinhos Mansos Peludos", "Jailson Mendes", "Vendo meu Amigo Comer a Esposa", "Golden Shower"]
            const surpresa2 = xvid[Math.floor(Math.random() * xvid.length)]
            await aruga.sendTextWithMentions(from, `*EQUIPE ❌VIDEOS*\n\n_Caro usuário @${surpresa.id.replace(/@c.us/g, '')} ..._\n\n_Sou da administração do Xvideos e nós percebemos que você não entrou em sua conta por mais de 2 semanas e decidimos checar pra saber se está tudo OK com o(a) nosso(a) usuário(a) mais ativo(a)._ \n\n_Desde a última vez que você visitou nosso site, você procurou mais de centenas de vezes por_ *"${surpresa2}"* _(acreditamos ser sua favorita), viemos dizer que elas foram adicionadas e temos certeza que você irá gostar bastante._ \n_Esperamos você lá!_\n\n_Para o nosso usuário(a) favorito(a), com carinho, Equipe Xvideos._`)
            await sleep(2000)
            break
        
			
			
		case 'gender':
		case 'genero':
            if (args.length == 0) return aruga.reply(from, 'Coloque um nome, apenas um, nada de sobrenome ou nomes inteiros, ainda mais por sua segurança!', id)
			const seanl = await axios.get(`https://api.genderize.io/?name=${args[0]}`)
			const gender = seanl.data.gender.replace('female', 'mulheres').replace('male', 'homens')
			await aruga.reply(from, `O nome "${seanl.data.name}" é mais usado por ${gender}.`, id)
			break
			
			
        case 'detector' :
            if (!isGroupMsg) return aruga.reply(from, 'Apenas grupos!', id)
			await aruga.reply(from, 'Calculando foto dos participantes do grupo...', id)
            await sleep(3000)
            const eu = await aruga.getGroupMembers(groupId)
            const gostosa = eu[Math.floor(Math.random() * eu.length)]
			console.log(gostosa.id)
            await aruga.sendTextWithMentions(from, `*ＤＥＴＥＣＴＯＲ   ＤＥ  ＧＯＳＴＯＳＡＳ👩‍⚕️*\n\n*pi pi pi pi*  \n*pipipipi🚨🚨🚨pipipipi🚨🚨🚨pipipipi🚨🚨🚨pipi*\n\n@${gostosa.id.replace(/@c.us/g, '')} *PARADA(O) AÍ🖐*\n\n*VOCÊ ACABA DE RECEBER DUAS MULTAS*\n\n*1 por não dar bom dia,boa tarde,boa noite e outra por ser muito*\n\n*gostosa(o)*\n\n*valor da multa:*\n*FOTO DA TETINHA NO PV kkkkk*`)
            await sleep(2000)
            break			

			
			
		/*case 'math':
            if (args.length == 0) return aruga.reply(from, 'Você não especificou uma conta matematica.', id)
            const mtk = body.slice(6)
            if (typeof math.evaluate(mtk) !== "number") {
            aruga.reply(from, `Você definiu mesmo uma conta? Isso não parece uma.`, id)
			} else {
				aruga.reply(from, `_A equação:_\n\n*${mtk}*\n\n_tem resultado de:_\n\n*${math.evaluate(mtk)}*`, id)
			}*/
			/*break
			
			
		case 'inverter':
            if (args.length == 0) return aruga.reply(from, 'Você não especificou uma frase para ser invertida.', id)
			const inver = body.slice(10).split('').reverse().join('')
			await aruga.reply(from, inver, id)*/
			/*break
			
			
		case 'contar':
            if (args.length == 0) return aruga.reply(from, 'Isso possui 0 letras, afinal, não há texto.', id)
			const count = body.slice(8).length
			await aruga.reply(from, `O texto possui ${count} letras.`, id)
			/*break
			
			
        case 'giphy':
			gark = body.trim().split(/ +/).slice(1)
			const link = gark.length !== 0 ? gark[0] : ''
            if (gark.length !== 1) return aruga.reply(from, `Ownn, você esqueceu de inserir o link?`, id)
            const isGiphy = link.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
            const isMediaGiphy = link.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
            if (isGiphy) {
                const getGiphyCode = link.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                if (!getGiphyCode) { return aruga.reply(from, 'Que peninha! O código de download dele está distante demais, mas talvez se você tentar novamente *apenas mais 1 vez...*', id) }
                const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                aruga.sendGiphyAsSticker(from, smallGifUrl)
                .catch((err) => aruga.reply(from, `Um passarinho me disse que esse erro está relacionado ao envio do sticker...`, id))
            } else if (isMediaGiphy) {
                const gifUrl = link.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                if (!gifUrl) { return aruga.reply(from, 'Que peninha! O código de download dele está distante demais, mas talvez se você tentar novamente *apenas mais 1 vez...*', id) }
                const smallGifUrl = link.replace(gifUrl[0], 'giphy-downsized.gif')
                aruga.sendGiphyAsSticker(from, smallGifUrl)
                .catch(() => {
                    aruga.reply(from, `Um passarinho me disse que esse erro está relacionado ao envio do sticker...`, id)
                })
            } else {
                await aruga.reply(from, 'Desculpa, mas eu só posso aceitar links do giphy.', id)
            }*/
            break


		/*case 'msg':
            if (args.length == 0) return aruga.reply(from, 'Você esqueceu de inserir uma mensagem... e.e', id)
			await aruga.sendText(from, `${body.slice(5)}`)
			break
			
			
		case 'id':
			if (!isGroupMsg) return aruga.reply(from, mess.error.Gp, id)
			aruga.reply(from, `A ID desse grupo é ${groupId}`, id)
			break*/
	
			
        //Owner Group
        case 'kickall': //mengeluarkan semua member
        if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
        let isOwner = chat.groupMetadata.owner == pengirim
        if (!isOwner) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai oleh owner grup!', id)
        if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
            const allMem = await aruga.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {

                } else {
                    await aruga.removeParticipant(groupId, allMem[i].id)
                }
            }
            aruga.reply(from, 'Success kick all member', id)
        break

        //Owner Bot
       case 'ban':
		    if (!isOwnerB) return await aruga.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')
                       if (mentionedJidList.length === 0) return await aruga.reply(from, `Format salah!`, id)
        if (mentionedJidList[0] === botNumber) return await aruga.reply(from, `Format salah!`, id)
            const allMemek = await aruga.getGroupMembers(groupId)
			 for (let i = 0; i < mentionedJidList.length; i++)
                    ban.push(mentionedJidList[i])
                    fs.writeFileSync('./settings/banned.json', JSON.stringify(ban))
                await aruga.reply(from, `Success ban target!`, id)
            break
    case 'unban':
case 'ban del':
		 if (!isOwnerB) return await aruga.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')
                               if (mentionedJidList.length === 0) return await aruga.reply(from, `Format salah!`, id)
                if (mentionedJidList[0] === botNumber) return await aruga.reply(from, `Format salah!`, id)
                let benet = ban.indexOf(mentionedJidList[0])
                ban.splice(benet, 1)
                fs.writeFileSync('./settings/banned.json', JSON.stringify(ban))
                await aruga.reply(from, `Success unban target!`, id)
            break
             case 'google':
                const googleQuery = body.slice(8)
                if(googleQuery == undefined || googleQuery == ' ') return dxxoo.reply(from, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
                google({ 'query': googleQuery }).then(results => {
                let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
                for (let i = 0; i < results.length; i++) {
                    vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
                }
                    aruga.reply(from, vars, id);
                }).catch(e => {
                    console.log(e)
                    aruga.sendText(ownerNumber, 'Google Error : ' + e);
                })
                break
                     case 'ptl':
                    if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg","https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg","https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg","https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg","https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg","https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg","https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg","https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg","https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg","https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg","https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg","https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg","https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg","https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg","https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg","https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg","https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg","https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg","https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg","https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg","https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg","https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg","https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg","https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg","https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg","https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg","https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg","https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg","https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
                    let pep = pptl[Math.floor(Math.random() * pptl.length)]
                    aruga.sendFileFromUrl(from, pep, 'pptl.jpg', 'nihh ngab', id)
                    break
            case 'groupinfo' :
            case 'gcinfo' :
                    if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
                    var totalMem = chat.groupMetadata.participants.length
                    var desc = chat.groupMetadata.desc
                    var groupname = name
                    var timestp = chat.groupMetadata.creation
                    var date = moment(timestp * 1000).format('dddd, DD MMMM YYYY')
                    var time = moment(timestp * 1000).format('HH:mm:ss')
                    var ownerwoi = chat.groupMetadata.owner
                    var grplink = antilink.includes(chat.id)
                    var botadmin = isBotGroupAdmins ? 'Admin' : 'Member'
                    var grouppic = await aruga.getProfilePicFromServer(chat.id)
                    if (grouppic == undefined) {
                         var pfp = errorurl
                    } else {
                         var pfp = grouppic 
                    }
                    await aruga.sendFileFromUrl(from, pfp, 'group.png', `*「 GROUP INFO 」*
*➸ Name : ${groupname}*

Group ini didirikan sejak *${date}* Pukul *${time}* oleh @${ownerwoi.replace('@c.us','')}


*➸ Members : ${totalMem}*
*➸ Antilink Status : ${grplink ? 'On' : 'Off'}*
*➸ Bot Group Status : ${botadmin}*
*➸ Group Description* 
${desc}
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
_Desc di update oleh : @${chat.groupMetadata.descOwner.replace('@c.us','')} pada *${moment(chat.groupMetadata.descTime * 1000).format('dddd, DD MMMM YYYY')}* pukul ${moment(chat.groupMetadata.descTime * 1000).format('HH:mm:ss')}_\n\nBy : Toin`)

                    break
                    case 'grupbot':
case 'grubbot':
case 'groupbot':
                        const ch = `https://chat.whatsapp.com/CtFJ2onIGU47020JQZGsyp\n\nSkuy join grup Bot`
                        await aruga.sendText(from, ch, id)
                        break
                    case 'mtk':
case 'math':
                        if (args.length === 3) return aruga.reply(from, `[❗] Kirim perintah *${prefix}math [ Angka ]*\nContoh : ${prefix}math 12 * 12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`)
                        const mtk = body.slice(5)
                        if (typeof Math_js.evaluate(mtk) !== "number") {
                        aruga.reply(from, `"${mtk}", bukan angka!\n[❗] Kirim perintah *${prefix}math [ Angka ]*\nContoh : ${prefix}math 12 * 12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`, id)
                    } else {
                        aruga.reply(from, `*Hasil :*\n_${mtk} = ${Math_js.evaluate(mtk)}_`, id)
                    }
                    break
                    case 'screen': {
                        if (!isOwnerB) return await aruga.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')
                        const snap = await aruga.getSnapshot()
                        aruga.sendImage(from, snap, 'snapshot.png', 'Session Snapshot')
                    }
                        break
                        case 'listbacot':
                            const bacul = dbcot
                            let bacotanmu = `╔══✪〘 *List Bacot!* 〙✪══\n`
                            for (let i = 0; i < bacul.length; i++) {
                                bacotanmu += '╠➥'
                                bacotanmu += ` ${bacul[i]}\n`
                            }
                            bacotanmu += '╚═〘 *Toin BOT* 〙'
                            await aruga.sendText(from, bacotanmu)
                            break
                        case 'saylist':
                            const saylest = dsay
                            let kimtil = `╔══✪〘 *Say List!* 〙✪══\n`
                            for (let i = 0; i < saylest.length; i++) {
                                kimtil += '╠➥'
                                kimtil += `${saylest[i]}\n`
                            }
                            kimtil += '╚═〘 *Toin BOT* 〙'
                            await aruga.sendText(from, kimtil)
                            break
                        case 'addsay':{
                            if (!args.length >= 1) return aruga.reply(from, 'Kalimatnya manaa?', id)
                            const say = body.slice(8)
                                dsay.push(say)
                                fs.writeFileSync('./lib/database/say.json' , JSON.stringify(dsay))
                                aruga.reply(from, `Done add say ke database\nTotal add say : *${dsay.length - 1}* ,` , id)
                        }
                        break
                        case 'addbacot':{
                            if (!args.length >= 1) return aruga.reply(from, 'ADD KATA TERSERAH KALIAN WOY!', id)  
                                const bacot = body.slice(10)
                                dbcot.push(bacot)
                                fs.writeFileSync('./lib/database/bacot.json', JSON.stringify(dbcot))
                                aruga.reply(from, `Sukses menambahkan Kata bacot ke database\nTotal data bacot sekarang : *${dbcot.length - 1}*`, id)
                            }
                            break
                        case 'delbacot':
       if (!isOwnerB) return await aruga.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')
          const delbd = dbcot.indexOf(body.slice(12))
                                    dbcot.splice(delbd, 1)
                                    fs.writeFileSync('./lib/database/bacot.json', JSON.stringify(dbcot))
                                    aruga.reply(from, `Success Menghapus Bacot!`, id)
                                break
                case 'bacot':
                    if(args.length == 1) {
                        const no = args[0]
                        const cekdb = dbcot.length
                        if(cekdb <= no) return await aruga.reply(from, `Total data saat ini hanya sampai *${cekdb - 1}*`, id)
                        const res =  dbcot[no]
                        aruga.sendText(from, res)
                        } else {
                            const kata = dbcot[Math.floor(Math.random() * (dbcot.length))];
                            aruga.sendText(from, kata)
                        }
                    break  
                case 'say':
                    if(args.length == 1){
                        const wuh = args[0]
                        const sayur = dsay.length
                        if(sayur <= wuh) return await aruga.reply(from, `Total database saat ini hanya sampe *${sayur - 1}` , id)
                        const lahs = dsay[wuh]
                        aruga.sendText(from, lahs)
                    } else {
                        const kata = dsay[Math.floor(Math.random() * (dsay.length))];
                        aruga.sendText(from, kata)
                    }
                    break
                    case 'delsay':
if (!isOwnerB) return await aruga.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')
                            const delsay = dsay.indexOf(body.slice(12))
                            dsay.splice(delsay, 1)
                            fs.writeFileSync('./lib/database/say.json', JSON.stringify(dsay))
                            aruga.reply(from, `Success Menghapus Say!`, id)
                        break
                               
                 case 'santet':
                    if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (mentionedJidList.length === 0) return aruga.reply(from, 'Tag member yang mau disantet\n\nContoh : #santet @tag | kalo berak kaga di siram', id)
                    if (args.length === 1) return aruga.reply(from, 'Masukkan alasan kenapa menyantet dia!!\n\nContoh : #santet @tag | kalo berak kaga di siram', id)
                        const terima1 = santet[Math.floor(Math.random() * (santet.length))]
                        const target = arg.split('|')[0]
                        const alasan = arg.split('|')[1]
                        await aruga.sendTextWithMentions(from, `Santet terkirim ke ${target}, Dengan alasan${alasan}\n\nJenis Santet Yang di Terima Korban adalah *${terima1}*\n\nBy : Toin`)
                break
case 'kutuk':
                    if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (mentionedJidList.length === 0) return aruga.reply(from, 'Tag member yang mau dikutuk\n\nContoh : #kutuk @tag | kalo berak kaga di siram', id)
                    if (args.length === 1) return aruga.reply(from, 'Masukkan alasan kenapa menyantet dia!!\n\nContoh : #kutuk @tag | kalo berak kaga di siram', id)
                        const terima2 = kutuk[Math.floor(Math.random() * (kutuk.length))]
                        const target2 = arg.split('|')[0]
                        const alasan2 = arg.split('|')[1]
                        await aruga.sendTextWithMentions(from, `Kutuk kau ${target2} jadi *${terima2}*\n\nBy : Toin`)
                break
                    case 'doggo':
                            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
                            let kya = list[Math.floor(Math.random() * list.length)]
                            aruga.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Doggo sparkles', id)
                        break
                    case 'wpanime' :
                            const walnime = ['https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','hithuttps://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
                            let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
                            aruga.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '', message.id)
                        break
                   case 'aiquote' :
                            const well = await axios.get("http://inspirobot.me/api?generate=true")
                            await aruga.sendFileFromUrl(from, well.data, 'quote.jpg', 'Nih...' , id )
                        break
                case 'ttp':
                     axios.get(`https://st4rz.herokuapp.com/api/ttp?kata=${body.slice(5)}`)
                        .then(res => {
                        aruga.sendImageAsSticker(from, res.data.result)
                     })
                    break
                 case 'kapan':
 if (args.length == 0) return aruga.reply(from, `Contoh #kapan saya nikah`, id)
                      const when = args.join(' ')
                     const ans = kapan[Math.floor(Math.random() * (kapan.length))]
                     if (!when) aruga.reply(from, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
                     await aruga.sendText(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}\n\nBy : Toin`)
                     break
                 case 'nilai':
                 case 'rate':
                     const rating = args.join(' ')
                     const awr = rate[Math.floor(Math.random() * (rate.length))]
                     if (!rating) aruga.reply(from, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`, id)
                     await aruga.sendText(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}\n\nBy : Toin`)
                     break
                 case 'apakah':
 if (args.length == 0) return aruga.reply(from, `Contoh #apakah saya cakep`, id)
                     const nanya = args.join(' ')
                     const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
                     if (!nanya) aruga.reply(from, '⚠️ Format salah! Ketik *#menu* untuk penggunaan.')
                     await aruga.sendText(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}\n\nBy : Toin`)
                     break
                  case 'bisakah':
 if (args.length == 0) return aruga.reply(from, `Contoh #bisakah saya terbang`, id)
                     const bsk = args.join(' ')
                     const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
                     if (!bsk) aruga.reply(from, '⚠️ Format salah! Ketik *3menu* untuk penggunaan.')
                     await aruga.sendText(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}\n\nBy : Toin`)
                     break
            case 'listban':
                let bened = `This is list of banned number\nTotal : ${banned.length}\n`
                for (let i of banned) {
                    bened += `➸ ${i.replace(/@c.us/g,'')}\n`
                }
                await aruga.reply(from, bened, id)
                break
            case 'me':
case 'my':
 if (!isGroupMsg) return aruga.reply(from, 'Desculpe, este comando só pode ser usado dentro do grupo!', id)
                if (isBanned) return false
                if (isGroupMsg) {
                    if (!quotedMsg) {
                    var pic = await aruga.getProfilePicFromServer(author)
                    var namae = pushname
                    var sts = await aruga.getStatus(author)
                    var adm = isGroupAdmins
                    const { status } = sts
                    if (pic == undefined) {
                    var pfp = errorurl
                    } else {
                        var pfp = pic
                    } 
                    await aruga.sendFileFromUrl(from, pfp, 'pfp.jpg', `*Perfil de usuário* ✨️ \n\n➸ *Nome do usuário: ${namae}*\n\n➸ *informação de usuário: ${status}*\n\n➸ *Grupo de Administradores: ${adm}*\n\nBy : Toin\n\n`)
                 } else if (quotedMsg) {
                 var qmid = quotedMsgObj.sender.id
                 var pic = await aruga.getProfilePicFromServer(qmid)
                 var namae = quotedMsgObj.sender.name
                 var sts = await aruga.getStatus(qmid)
                 var adm = isGroupAdmins
                 const { status } = sts
                  if (pic == undefined) {
                  var pfp = errorurl
                  } else {
                  var pfp = pic
                  } 
                  await aruga.sendFileFromUrl(from, pfp, 'pfp.jpg', `*Perfil de usuário* ✨️ \n\n➸ *Nome do usuário: ${namae}*\n\n➸ *informação de usuário: ${status}*\n\n➸ *Grupo de Administração: ${adm}*\n\nBy : Toin\n\n`)
                 }
                }
                break
        case 'listblock':
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await aruga.reply(from, hih, id)
            break
case 'ttp2':
             if (args.length === 0) return aruga.reply(from, `Kirim perintah *#ttp2 [ Teks ]*, contoh *#ttp2 Toin*`, id)
            const ttp2t = body.slice(6)
            const lttp2 = ["Orange","White","Green","Black","Purple","Red","Yellow","Blue","Navy","Grey","Magenta","Brown","Gold"]
            const rttp2 = lttp2[Math.floor(Math.random() * (lttp2.length))]
            await aruga.sendStickerfromUrl(from, `https://api.vhtear.com/textmaker?text=${ttp2t}&warna=${rttp2}&apikey=${vhtearkey}`)
            break
case 'pastebin': //BY VINZ
           if (args.length == 0) return aruga.reply(from, `Ketik command ${prefix}pastebin [text]|[nama]\nContoh ${prefix}pastebin ini contohnya|tolll`, id)
            await aruga.reply(from, mess.wait, id)
            var bdtrm = body.slice(10).trim().split('|')
            const pstbn = await axios.get(`https://zeksapi.herokuapp.com/api/pastebin?apikey=benbenz&text=${bdtrm[0]}&name=${bdtrm[1]}`) 
	    console.log(bdtrm[0])
	    if (pstbn.data.status == false) return aruga.reply(from, pstbn.data.message ,id)
            await aruga.reply(from, pstbn.data.result, id) 
            break
case 'silk':
              if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}silk [ Teks ]*, contoh *${prefix}silk Toin*`, id)
            aruga.reply(from, mess.wait, id)
            const slkz = body.slice(5)
            if (slkz.length > 10) return aruga.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await aruga.sendFileFromUrl(from, `https://api.vhtear.com/silktext?text=${slkz}&apikey=${vhtearkey}`, 'silk.jpg', '', id)
            break

 case 'pinterest':
 case 'images2':
              if (args.length === 0) return aruga.reply(from, 'Kirim perintah *#pinterest [query]*\nContoh : *#pinterest Toin*', id)
            const ptrsq = body.slice(9)
            const ptrst = await fetch(`https://api.vhtear.com/pinterest?query=${ptrsq}&apikey=${vhtearkey}`)
            if (!ptrst.ok) throw new Error(`Error Pinterest : ${ptrst.statusText}`)
            const ptrs = await ptrst.json()
            const ptrsn = ptrs.result
            const b = JSON.parse(JSON.stringify(ptrsn))
            const ptrs2 =  b[Math.floor(Math.random() * b.length)]
            const image = await bent("buffer")(ptrs2)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            await aruga.sendImage(from, base64, 'ptrs.jpg', `*Image*\n\n*Hasil Pencarian : ${ptrsq}*\n\nBy : Toin`)
               break
case 'nhview':
              if (args.length === 1) return aruga.reply(from, 'Kirim perintah *#nhview [212121]*\nContoh : *#nhview 321421*', id)
            const nhsh = body.slice(11)
            const nhsh2 = await axios.get('https://mnazria.herokuapp.com/api/nhentai?code='+nhsh)
            for (let i = 0; i < nhsh2.length; i++) {
                await aruga.sendImage(from, nhsh2[i].data, 'thumbserc.jpg', '', id)
                }
                        break

 case 'nhder':
             if (args.length >=2){
                const code = args[1]
                const url = 'https://nhder.herokuapp.com/download/nhentai/'+code+'/zip'
                const short = []
                const shortener = await urlShortener(url)
                url['short'] = shortener
                short.push(url)
                const caption = `*NEKOPOI DOWNLOADER*\n\nLink: ${shortener}`
                aruga.sendText(from, caption)
                           } else {
                aruga.sendText(from, 'Maaf tolong masukan code nuclear')
            }
            break
 case 'maluser':
 if (!isGroupMsg) return aruga.reply(from, 'Desculpe, este comando só pode ser usado dentro do grupo!', id)
               
           const username = body.slice(18)
            aruga.reply(from, mess.wait, id)
            try {
                const result = await axios.get(`https://api.jikan.moe/v3/user/${username}`)
                const jikan =  result.data
                const Data = `*「 USUÁRIO - MYANIMELIST 」*
• Nome do usuário: ${jikan.username}
• ID do usuário: ${jikan.user_id}
• Gênero: ${jikan.gender}
• Localização: ${jikan.location}
• Ingressou: ${jikan.joined}
⭐️ Estatísticas de anime ⭐️
• Dias assistidos: ${jikan.anime_stats.days_watched}
• Pontuação média: ${jikan.anime_stats.mean_score}
• Assistindo no momento: ${jikan.anime_stats.watching}
• Completo: ${jikan.anime_stats.completed}
• Em espera: ${jikan.anime_stats.on_hold}
• Desistiu: ${jikan.anime_stats.dropped}
• Pretendo assistir: ${jikan.anime_stats.plan_to_watch}
🎯️ Estatísticas de mangá 🎯️
• Dias lidos: ${jikan.manga_stats.days_read}
• Pontuação média: ${jikan.manga_stats.mean_score}
• Lendo atualmente: ${jikan.manga_stats.reading}
• Completo: ${jikan.manga_stats.completed}
• Em espera: ${jikan.manga_stats.on_hold}
• Desistiu: ${jikan.manga_stats.dropped}
• Plano para ler: ${jikan.manga_stats.plan_to_read}\n\nBy : Toin`

                await aruga.sendFileFromUrl(from, `${jikan.image_url}`,`user.png`, Data)
                          } catch (err) {
                console.log(err)
                await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
            }    
            break
case 'fml':
            const fmlx = await rugaapi.fml()
            await aruga.reply(from, fmlx, id)
            .catch(() => {
                aruga.reply(from, 'Hayolohhh, ada yang error!!', id)
            })
            break
 case 'memeindo':
            const memeindox = await rugaapi.memeindo()
            await aruga.sendFileFromUrl(from, memeindox, 'memeindo.jpeg', 'Nih.....', id)
            .catch(() => {
                aruga.reply(from, 'Hayolohhh, ada yang error!!', id)
            })
            break
 case 'bokep2':
case '18+2':
            const bkpndox = await rugaapi.bokep2()
            await aruga.sendFileFromUrl(from, bkpndox, 'bokep2.jpeg', 'Ingat dosa bang...', id)
            .catch(() => {
                aruga.reply(from, 'Hayolohhh, ada yang error!!', id)
            })
            break
        case 'darkjokes':
            const darkjokesx = await rugaapi.darkjokes()
            await aruga.sendFileFromUrl(from, darkjokesx, 'memeindo.jpeg', 'Mantab mhak mhak..', id)
            .catch(() => {
                aruga.reply(from, 'Hayolohhh, ada yang error!!', id)
            })
            break
case 'Toinimg':
            const Toinimg = await rugaapi.zimg()
            await aruga.sendFileFromUrl(from, Toinimg, 'Toin.jpeg', 'Nih dari Toin...', id)
            .catch(() => {
                aruga.reply(from, 'Hayolohhh, ada yang error!!', id)
            })
            break
 case 'malanime':
            const keyword = message.body.replace('malanime', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/anime?q=${keyword}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await aruag.sendFileFromUrl(from, errorurl2, 'error.png', '💔️Desculpe, nenhum anime foi encontrado', id)
              return null
              }
            const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
            const content = `*Anime encontrado!*
✨️ *Título:* ${title}
🎆️ *Episódios:* ${episodes}
💌️ *Avaliação:* ${rated}
❤️ *Ponto:* ${score}
💚️ *Sinopse:* ${synopsis}
🌐️ *URL*: ${url}\n\nBy : Toin`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            aruga.sendImage(from, base64, title, content)
                      } catch (err) {
             console.error(err.message)
             await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Desculpe, nenhum anime foi encontrado')
           }
          break
case 'malcharacter':
             const keywords = message.body.replace('malcharacter', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/character?q=${keywords}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Desculpe, nenhum anime foi encontrado', id)
              return null
              }
            const { name, alternative_names, url, image_url } = parsed.results[0]
            const contentt = `*Anime encontrado!*
✨️ *Nome:* ${name}
💌️ *Nome alternativos:* ${alternative_names}
🌐️ *URL*: ${url}\n\nBy : Toin`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            aruga.sendImage(from, base64, name, contentt)
                      } catch (err) {
             console.error(err.message)
             await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Desculpe, nenhum anime foi encontrado')
           }
          break

	case 'stickmatrix':
		if (args.length === 0) return aruga.reply(from, 'Teksnya mana??', id)
			aruga.reply(from, mess.wait, id)
			const matrixnyas = await fetch(`http://api-melodicxt.herokuapp.com/api/txtcustom?theme=matrix&text=${body.slice(13)}&apiKey=administrator`)
	        const matrixs = await matrixnyas.json()
			aruga.sendStickerfromUrl(from, matrixs.result)
			break
	case 'sticktechno':
		if (args.length === 0) return aruga.reply(from, 'Teksnya mana??', id)
		aruga.reply(from, mess.wait, id)
			const technonyas = await fetch(`https://tobz-api.herokuapp.com/api/textpro?theme=neon_technology&text=${body.slice(13)}&apikey=BotWeA`)
			const technos = await technonyas.json()
			aruga.sendStickerfromUrl(from, technos.result)
			break
case 'stickdarcula':
	       if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		 aruga.reply(from, mess.wait, id)	
	     const darculanyas = `https://carbonnowsh.herokuapp.com/?code=${body.slice(14)}&theme=darcula&backgroundColor=rgba(50, 50, 50, 150)`
	      aruga.sendFileFromUrl(from, darculanyas)
	     break
	case 'sticklava':
		if (args.length === 0) return aruga.reply(from, 'Teksnya mana??', id)
			aruga.reply(from, mess.wait, id)
			const lavanya = `https://api.vhtear.com/fire_maker?text=${body.slice(10)}&apikey=${vhtearkey}`
			aruga.sendStickerfromUrl(from, lavanya)
			break
	case 'stickequal':
		if (args.length === 0) return aruga.reply(from, 'Teksnya mana??', id)
			aruga.reply(from, mess.wait, id)
			const equalnya = `ttps://arugaz.my.id/api/textpro/equalizer?text=${body.slice(11)}`
			aruga.sendStickerfromUrl(from, equalnya)
			break
	
	case 'stickpro':
	if (args.length === 0) return aruga.reply(from, 'Teksnya mana??', id)
			aruga.reply(from, mess.wait, id)
			const oldnyah = `https://arugaz.my.id/api/textpro/old1917?text=${body.slice(9)}`
			aruga.sendStickerfromUrl(from, oldnyah)
			break
	
case 'stickph':
 arg = body.trim().split(' ')
			aruga.reply(from, mess.wait, id)
			const ph9 = arg[1]
			const ph7 = arg[2]
			const phnyi = `http://docs-jojo.herokuapp.com/api/phblogo?text1=${ph3}&text2=${ph4}`
			aruga.sendStickerfromUrl(from, phnyi)
            break
	
    case 'sticklion':
	     if (args.length === 1) return aruga.reply(from, 'Teks nya mana??', id)
		 if (args.length === 2) return aruga.reply(from, 'Silahkan ketik #sticklion text1 text2 Contoh #sticklion  Toin', id)
		 arg = body.trim().split(' ')
		 aruga.reply(dari, mess.wait, id)
		 const textlions = arg[1]
		 const liontexts = arg[2]
		 const lions = await fetch(`https://tobz-api.herokuapp.com/api/textpro?theme=lionlogo&text1=${textlions}&text2=${liontexts}&apikey=BotWeA`)
		 const lionnyas = await lions.json()
		 aruga.sendStickerfromUrl(from, lionnyas.result)
		 break
	case 'sticksnow':
	     if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const snownyas = await fetch(`https://tobz-api.herokuapp.com/api/textpro?theme=snow&text=${body.slice(11)}&apikey=BotWeA`)
		const snows = await snownyas.json()
		aruga.sendStickerfromUrl(from, snows.result)
		break

	    case 'stickjoker':
	   if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		aruga.reply(from, mess.wait, id)
		 const textjokers = body.slice(12)
		 const jokers = await fetch(`https://tobz-api.herokuapp.com/api/textpro?theme=jokerlogo&text=${textjoker}&apikey=BotWeA`)
		 const jokernyas = await jokers.json()
		 aruga.sendStickerfromUrl(from, jokernyas.result)
		 break
	case 'stickgaming':
	    if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
	   aruga.reply(from, mess.wait, id)
		const gamenyas = body.slice(13)
		 const gamings = await fetch(`https://api-jojo.herokuapp.com/api/gaming?text=${gamenyas}`)
		 const gamnyas = await gamings.json()
		 aruga.sendStickerfromUrl(from, gamnyas.result)
		 break
	case 'randomsticker':
case 'randomstiker':
	const walnimeo = ['https://camo.githubusercontent.com/9c184e56a76795eaeb8e7584424520de07a9aa4db57323f626ef9ff7730f62b9/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f34644d3155373661415133646245366263332f67697068792e676966','https://camo.githubusercontent.com/0afcc6050ce6d1858e1f8136ad418fadea998a0188ae20364504ed6c9bbb6b2c/68747470733a2f2f696d61676573352e616c706861636f646572732e636f6d2f3931312f3931313631342e706e67','https://raw.githubusercontent.com/mhankbarbar/whatsapp-bot/master/media/img/Kaguya.png','https://images.alphacoders.com/605/thumb-350-605592.png','https://images5.alphacoders.com/481/thumb-350-481903.png','https://images7.alphacoders.com/611/thumb-350-611138.png','https://images4.alphacoders.com/476/thumb-350-47698.png','https://images2.alphacoders.com/727/thumb-350-72732.png','https://images5.alphacoders.com/314/thumb-350-314574.png','https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
		   aruga.reply(from, mess.wait, id)
		   let walnimeok = walnimeo[Math.floor(Math.random() * walnimeo.length)]
		   aruga.sendStickerfromUrl(from, walnimeok)
		   break
	case 'textgrafiti':
	case 'teksgrafiti':
	      if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		aruga.reply(from, mess.wait, id)
		 const textgrafiti = body.slice(13)
		 const grafiti = await fetch(`https://api.zeks.xyz/api/grafiti?text=${textgrafiti}&apikey=apivinz`)
		 const grafitinya = await grafiti.json()
		 aruga.sendFileFromUrl(from, grafitinya.result, 'grafiti.jpg', 'Nih...', id)
		 break
	case 'flowertext':
	      if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		aruga.reply(from, mess.wait, id)
		 const textflower = body.slice(12)
		 const flower = await fetch(`https://api.zeks.xyz/api/flowertext?text=${textflower}&apikey=apivinz`)
		 const flowernya = await flower.json()
		 aruga.sendFileFromUrl(from, flowernya.result, 'flower.jpg', 'Nih...', id)
		 break
	
	
		case 'tektjoker':
	     if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		aruga.reply(from, mess.wait, id)
		 const textjoker = body.slice(11)
		 const joker = await fetch(`https://tobz-api.herokuapp.com/api/textpro?theme=jokerlogo&text=${textjoker}&apikey=BotWeA`)
		 const jokernya = await joker.json()
		 aruga.sendFileFromUrl(from, jokernya.result, 'joker.jpg', 'Nih...', id)
		 break
case 'textkopi':
	     if (args.length === 0) return aruga.reply(from, 'Teks nya mana??\n\nJangan pake spasi ya kak..', id)
		aruga.reply(from, mess.wait, id)
		 const textkopi = body.slice(10)
		 const kopi = await fetch(`http://api.itsmeikyxsec404.xyz/coffe?apikey=itsmeiky633&text=${textkopi}`)
		 const kopinya = await kopi.json()
		 aruga.sendFileFromUrl(from, kopinya.result, 'kopi.jpg', 'Nih...', id)

case 'textcsgo':
	     if (args.length === 0) return aruga.reply(from, 'Teks nya mana??\n\nJangan pake spasi ya kak..', id)
		aruga.reply(from, mess.wait, id)
		 const textcsgo = body.slice(10)
		 const csgo = await fetch(`http://api.itsmeikyxsec404.xyz/csgo?apikey=itsmeiky633&text=${textcsgo}`)
		 const csgonya = await csgo.json()
		 aruga.sendFileFromUrl(from, csgonya.result, 'csgo.jpg', 'Nih...', id)
		 break
case 'textcros':
	     if (args.length === 0) return aruga.reply(from, 'Teks nya mana??\n\nJangan pake spasi ya kak..', id)
		aruga.reply(from, mess.wait, id)
		 const textcros = body.slice(10)
		 const cros = await fetch(`http://api.itsmeikyxsec404.xyz/crossfire?apikey=itsmeiky633&text=${textcros}`)
		 const crosnya = await cros.json()
		 aruga.sendFileFromUrl(from, crosnya.result, 'cros.jpg', 'Nih...', id)
		 break
case 'textkayu':
	     if (args.length === 0) return aruga.reply(from, 'Teks nya mana??\n\nJangan pake spasi ya kak..', id)
		aruga.reply(from, mess.wait, id)
		 const textkayu = body.slice(10)
		 const kayu = await fetch(`http://api.itsmeikyxsec404.xyz/woodblock?apikey=itsmeiky633&text=${textkayu}`)
		 const kayunya = await kayu.json()
		 aruga.sendFileFromUrl(from, kayunya.result, 'kayu.jpg', 'Nih...', id)
		 break
case 'textwarface':
	     if (args.length === 0) return aruga.reply(from, 'Teks nya mana??\n\nJangan pake spasi ya kak..', id)
		aruga.reply(from, mess.wait, id)
		 const textface = body.slice(13)
		 const face = await fetch(`http://api.itsmeikyxsec404.xyz/warface?apikey=itsmeiky633&text=${textface}`)
		 const facenya = await face.json()
		 aruga.sendFileFromUrl(from, facenya.result, 'face.jpg', 'Nih...', id)
		 break
	
 case 'textamerika':
	case 'teksamerika':
	   if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const amrknya = `https://arugaz.my.id/api/textpro/captamerica?text=${body.slice(10)}`
		aruga.sendFileFromUrl(from, amrknya, 'amrk.jpg', 'Nih...', id)
		break
case 'textfoil':
	case 'teksfoil':
	   if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const foilnya = `https://arugaz.my.id/api/textpro/foilballoon?text=${body.slice(9)}`
		aruga.sendFileFromUrl(from, foilnya, 'foil.jpg', 'Nih...', id)
		break
case 'textsummer':
	case 'tekssummer':
	   if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const summernya = `https://arugaz.my.id/api/textpro/sandsummer?text=${body.slice(11)}`
		aruga.sendFileFromUrl(from, summernya, 'summer.jpg', 'Nih...', id)
		break
case 'textwhite':
	case 'tekswhite':
	   if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const whitenya = `https://arugaz.my.id/api/textpro/sandwrite?text=${body.slice(10)}`
		aruga.sendFileFromUrl(from, whitenya, 'white.jpg', 'Nih...', id)
		break
case 'textmetal':
	case 'teksmetal':
	   if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const metalnya = `https://api.vhtear.com/metal_maker?text=${body.slice(11)}&apikey=${vhtearkey}`
		aruga.sendFileFromUrl(from, metalnya, 'metal.jpg', 'Nih...', id)
		break 
case 'textwater':
	case 'tekswater':
	   if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const waternya = `https://api.vhtear.com/water_maker?text=${body.slice(11)}&apikey=${vhtearkey}`
		aruga.sendFileFromUrl(from, waternya, 'water.jpg', 'Nih...', id)
		break
case 'galaxytext':
	case 'galaxytext':
	   if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const galaxynya = `https://api.vhtear.com/galaxytext?text=${body.slice(11)}&apikey=${vhtearkey}`
		aruga.sendFileFromUrl(from, galaxynya, 'galaxy.jpg', 'Nih...', id)
		break
	case 'textwroom':
	case 'tekswroom':
	    if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const wroomnya = `https://arugaz.my.id/api/flamingtext/wroom?text=${body.slice(11)}`
		aruga.sendFileFromUrl(from, wroomnya, 'wroom.jpg', 'Nih...', id)
		break
	case 'text3d2':
	case 'teks3d2':
	    if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const t3d2nya = `https://arugaz.my.id/api/flamingtext/text3d?text=${body.slice(9)}`
		aruga.sendFileFromUrl(from, t3d2nya, '3d.jpg', 'Nih...', id)
		break
	
	case 'textbird':
	case 'teksbird':
	    if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const birdnya = `https://arugaz.my.id/api/flamingtext/blackbird?text=${body.slice(10)}`
		aruga.sendFileFromUrl(from, birdnya, '3d.jpg', 'Nih...', id)
		break
	
	case 'textmemo':
	case 'teksmemo':
	     if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		const memonya = `https://arugaz.my.id/api/flamingtext/memories?text=${body.slice(10)}`
		aruga.sendFileFromUrl(from, memonya, 'memo.jpg', 'Nih...', id)
		break

case 'stickfire':
	    if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		 aruga.reply(from, mess.wait, id)
		 const textfires = body.slice(11)
		 const fires = await fetch(`https://api-zeks.harispoppy.com/api/tfire?text=${body.slice(11)}&apikey=apivinz`)
		 const firenyas = await fires.json()
		 aruga.sendStickerfromUrl(from, firenyas.result)
		 break
 case 'newstickerline':
            aruga.reply(from, mess.wait, id)
            try {
                const stcline = await fetch(`https://api.vhtear.com/newsticker?apikey=${vhtearkey}`)
                if (!stcline.ok) throw new Error(`unexpected response ${stcline.statusText}`)
                const stcline2 = await stcline.json()
                const { hasil } = await stcline2.result
                let xixixi = `*「 NEW STICKER LINE 」*\n\n`
                for (let i = 0; i < hasil.length; i++) {
                    xixixi += `\n─────────────────\n\n*Title* : ${hasil[i].title}\n*Url* : ${hasil[i].uri}\n`
                }
                await aruga.sendFileFromUrl(from, 'https://play-lh.googleusercontent.com/BkvRJsjYiEjb0-XKuop2AurqFKLhhu_iIP06TrCTGAq180P9Briv8Avz8ncLp7bOmCs', 'newstc.jpg', xixixi, id)
               
            } catch (err) {
                    console.log(err)
                    await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                   aruga.sendText(ownerNumber, 'Berita Error : ' + err)
            }
            break
 case 'news':
case 'cnn':
           aruga.reply(from, mess.wait, id)
            try {
                const response2 = await fetch(`https://api.vhtear.com/beritaterbaru&apikey=${vhtearkey}`)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonber = await response2.json()
                const { data } = await jsonber.result
                let xixixi = `*「 BERITA TERKINI 」*\n\n`
                for (let i = 0; i < data.length; i++) {
                    xixixi += `\n─────────────────\n\n*Source* : ${data[i].url}\n*Penulis* : ${data[i].author}\n*Judul* : ${data[i].title}\n*Deskripsi* : ${data[i].description}\n*Dipublikasi* : ${data[i].publishedAt}\n*Konten* : ${data[i].content}\n`
                }
                await aruga.sendFileFromUrl(from, data[0].urlToImage, 'thumbserc.jpg', xixixi, id)
                          } catch (err) {
                    console.log(err)
                    await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    aruga.sendText(ownerNumber, 'Berita Error : ' + err)
            }
            break

 
case 'goldpb':
case 'goldbp':
                if (args.length == 0) return aruga.reply(from, `Bot akan mengirimkan Gold Play ButToin dengan nama yang kalian custom sendiri\nContoh : ${prefix}goldpb Urbaee`, id)
                const yuza = body.slice(8)
                await axios.get(`https://api.zeks.xyz/api/gplaybutToin?text=${yuza}&apikey=apivinz`).then(res => {
                    console.log('Getting Picture');
                    aruga.sendFileFromUrl(from, `${res.data.result}`, 'image.jpg', 'Congratsss for 1 Million Subscribers', id)
                    })
                .catch(() => {
                    aruga.reply(from, 'Error....', id)
                })
                break
            case 'silverpb':
case 'silverbp':
                if (args.length == 0) return aruga.reply(from, `Bot akan mengirimkan Silver Play ButToin dengan kata yang anda masukkan\nContoh : ${prefix}silverpb Urbaee`, id)
                const yuzu = body.slice(10)
                await axios.get(`https://api.zeks.xyz/api/splaybutToin?text=${yuzu}&apikey=apivinz`).then(res => {
                    aruga.sendFileFromUrl(from, `${res.data.result}`, 'image.jpg', 'Congratss!!', id)
                    .catch(() => {
                        aruga.reply(from, 'Error ngab', id)
                    })
                })
                .catch(() => {
                    aruga.reply(from, 'Error ngab...', id)
                })
                break
case 'joox':
 if (!isOwnerB) return aruga.reply(from, `Maaf w private yah._.`, id)
          if (args.length === 0) return aruga.reply(from, `Kirim perintah *#joox [ Optional ]*\nContoh : *#joox Alan Walker*`, id)
             aruga.reply(from, mess.wait, id)
            rugaapi.joox(args[1]).then(async(res) => {
                let { penyanyi, judul, album, linkImg, linkMp3, filesize, ext, duration } = await res
                let tjoox = `*「 JOOX DOWNLOADER 」*\n\n➸ *Penyanyi:* ${penyanyi}\n➸ *Judul:* ${judul}\n➸ *Album:* ${album}\n➸ *Ext:* ${ext}\n➸ *Size:* ${filesize}\n➸ *Durasi:* ${duration}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                aruga.sendImage(from, linkImg, judul, tjoox)
               aruga.sendFileFromUrl(from, linkMp3, `${judul}.${ext}`, '', id).catch(() => aruga.reply(from, mess.error.Yt4, id))
                        }).catch((err) => {
                console.log(err);
                aruga.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
case 'ssphone':
               if (args.length === 0) return aruga.reply(from, 'Kirim perintah *#ssphone [linkWeb]*\nContoh : *#ssphone https://neonime.vip*', id)
            const ssphone = body.slice(9)
            aruga.sendFileFromUrl(from, `https://api.vhtear.com/ssweb?link=${ssphone}&type=phone&apikey=${vhtearkey}`, 'ssphone.jpg', '', id)
                     break
        case 'sspc':
           if (args.length === 0) return aruga.reply(from, 'Kirim perintah *#sspc [linkWeb]*\nContoh : *#sspc https://neonime.vip*', id)
            const sspc = body.slice(6)
           aruga.sendFileFromUrl(from, `https://api.vhtear.com/ssweb?link=${sspc}&type=pc&apikey=${vhtearkey}`, 'sspc.jpg', '', id)
            break 
case 'bitly':
            if (args.length === 0) return aruga.reply(from, 'Kirim perintah *#bitly [linkWeb]*\nContoh : *#bitly https://neonime.vip*', id)
            const shorturl1 = body.slice(7)
            const bitly1 = await axios.get('https://tobz-api.herokuapp.com/api/bitly?url=${shorturl1}&apikey=BotWeA')
            const bitly2 = bitly1.data
            if (bitly2.error) return aruga.reply(from, bitly2.error, id)
            const surl2 = `Link : ${shorturl1}\nShort URL : ${bitly2.result}\n\nBy : Toin`
            aruga.sendText(from, surl2, id)
                       break
        case 'tinyurl':
            if (args.length === 0) return aruga.reply(from, 'Kirim perintah *#tinyurl [linkWeb]*\nContoh : *#tinyurl https://neonime.vip*', id)
            const shorturl2 = body.slice(9)
            const tiny1 = await axios.get('https://tobz-api.herokuapp.com/api/tinyurl?url=' + shorturl2 + '&apikey=BotWeA')
            const tiny2 = tiny1.data
            if (tiny2.error) return aruga.reply(from, tiny2.error, id)
            const surl3 = `Link : ${shorturl2}\nShort URL : ${tiny2.result}\n\nBy : Toin`
            aruga.sendText(from, surl3, id)
            break

 case 'smulestalk':
           if (args.length === 0) return aruga.reply(from, 'Kirim perintah *#smulestalk [@username]*\nContoh : *#smulestalk loli*', id)
            argz = body.trim().split(' ')
            console.log(...argz[0])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const sstalk = await slicedArgs.join(' ')
            console.log(sstalk)
            try {
            const sstalk2 = await axios.get('https://api.vhtear.com/smuleprofile?query=${sstalk}&apikey=${vhtearkey}')
            const { username, full_name, follower, follow, biography, is_vip, picture, recording } = sstalk2.data.result
            const smule = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Full Name:* ${title}
➸ *Biografi:* ${biography}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *VIP*: ${is_vip}
➸ *Total Rekaman:* ${recording}\n\nBy : Toin`
            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            aruga.sendImage(from, base64, title, smule)
                      } catch (err) {
             console.error(err.message)
             await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             aruga.sendText(ownerNumber, 'Error Smulestalk : '+ err)
            }
          break

 case 'heroml':
            if (args.length === 0) return aruga.reply(from, 'Kirim perintah *#heroml [nama hero]*\nContoh : *#heroml akai*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/herodetail?query=' + body.slice(8) + '&apikey=' + vhtearkey)
            if (resp.data.error) return aruga.reply(from, resp.data.error, id)
            const anm2 = `➸ Title : ${resp.data.result.title}\n➸ Quotes : ${resp.data.result.quotes}\n➸ Info : ${resp.data.result.info}\n➸ Atribut : ${resp.data.result.attributes}\n\nBy : Toin`
            aruga.sendFileFromUrl(from, resp.data.result.pictHero, 'hero.jpg', anm2, id)
                } catch (err) {
                console.error(err.message)
                await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Hero tidak ditemukan')
                aruga.sendText(ownerNumber, 'Heroml Error : ' + err)
           }
            break
 case 'nomorhoki':
             if (args.length === 0) return aruga.reply(from, 'Kirim perintah *#nomorhoki [no hp kamu]*\nContoh : *#nomorhoki 082139549692*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/nomerhoki?no=' + body.slice(11) + '&apikey=' + vhtearkey)
            if (resp.data.error) return aruga.reply(from, resp.data.error, id)
            const anm2 = `➸ Hasil :\n ${resp.data.result.hasil}\n\nBy : Toin`
           aruga.reply(from, anm2, id)
                      } catch (err) {
                console.error(err.message)
                await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Nomor Hoki tidak ditemukan')
                aruga.sendText(ownerNumber, 'Nomorhoki Error : ' + err)
           }
            break
case 'textgplay':
	case 'textgplay':
	    if (args.length === 0) return aruga.reply(from, 'Teks nya mana??', id)
		 aruga.reply(from, mess.wait, id)
		 		 const textsilver = body.slice(11)
		 const silvernya = await fetch(`https://api-zeks.harispoppy.com/api/splaybutToin?text=${textsilver}&apikey=apivinz`)
		 const silver = await silvernya.json()
		 aruga.sendFile(from, silver.result, 'silver.jpg', 'nih...', id)
		 break
 case 'twitterstalk':
        case 'twtstalk':
            if (args.length === 1)  return aruga.reply(from, 'Kirim perintah *#twtstalk @username*\nContoh *#twtstalk @miakhalifah*', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const twstalk = await slicedArgs.join(' ')
            console.log(twstalk)
            try {
            const twstalk2 = await axios.get('http://melodicxt.herokuapp.com/api/twtprofile?user=' + twstalk + '&apiKey=' + administrator)
            const { created_at, user } = twt.result[0]
	    const twtz = `*「 TWITTER PROFILE 」*
• *Username:* @${user.screen_name}
• *Nama:* ${user.name}
• *Deskripsi:* ${user.description}
• *Pengikut:* ${user.followers_count}
• *Mengikuti*: ${user.friends_count}
• *Jumlah Favorite:* ${user.favourites_count}
• *Jumlah Status:* ${user.statuses_count}
• *Dibuat:* ${created_at}
• *Link:* https://twitter.com/${user.screen_name}\n\nBy : Toin`

            const pictk = await bent("buffer")(user.profile_image_url)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            aruga.sendImage(from, base64, name, twtz)
                      } catch (err) {
             console.error(err.message)
             await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             aruga.sendText(ownerNumber, 'Twitter Error : ' + err)
           }
          break 
 case 'checkip':
            if (args.length === 1) return aruga.reply(from, 'Kirim perintah *#checkip [ipaddress]*\nContoh : *#checkip 182.0.144.145*', id)
            tobz.reply(from, mess.wait, id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const cekip = await slicedArgs.join(' ')
            console.log(cekip)
            try {
            const cekip2 = await axios.get('https://mnazria.herokuapp.com/api/check?ip=' + cekip)
            const { city, continent_name, country_name, ip, latitude, location, longitude, region_name } = cekip2.data
            const cekip3 = `*User Ditemukan!*
➸ *Kota:* ${city}
➸ *Benua:* ${continent_name}
➸ *Negara:* ${country_name}
➸ *Ip Address:* ${ip}
➸ *Garis Lintang:* ${latitude}
➸ *Kode Telepon:* +${location.calling_code}
➸ *Ibu Kota:* +${location.capital}
➸ *Bahasa:* +${location.languages[0].name}
➸ *Garis Bujur:* ${longitude}
➸ *Wilayah:* +${region_name}\n\nBy : Toin`

            const pictk = await bent("buffer")(location.country_flag)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            aruga.sendImage(from, base64, city, cekip3)
                      } catch (err) {
             console.error(err.message)
             await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             aruga.sendText(ownerNumber, 'Error Check IP : '+ err)
           }
          break
     
        case 'bc':
            if (!isOwnerB) return aruga.reply(from, `Perintah ini hanya untuk Owner  Toin`, id)
                bctxt = body.slice(4)
                txtbc = `〘 *Toin BOT* 〙\n\n${bctxt}`
                const semuagrup = await aruga.getAllChatIds();
                if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    for(let grupnya of semuagrup){
                        var cekgrup = await aruga.getChatById(grupnya)
                        if(!cekgrup.isReadOnly) aruga.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                    }
                    aruga.reply('Broadcast sukses!')
                }else{
                    for(let grupnya of semuagrup){
                        var cekgrup = await aruga.getChatById(grupnya)
                        if(!cekgrup.isReadOnly && isMuted(grupnya)) aruga.sendText(grupnya, txtbc)
                    }
                            aruga.reply('Broadcast Success!')
                }
                break
            case 'leaveall': //mengeluarkan bot dari semua group serta menghapus chatnya
            if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChatso = await aruga.getAllChatIds()
            const loadedx = await aruga.getAmountOfLoadedMessages()
            const allGroupq = await aruga.getAllGroups()
            for (let gclist of allGroupq) {
                await aruga.sendText(gclist.contact.id, `Maaf bot sedang pembersihan,\n- Total Chat Aktif : *${allChatso.length}*\n- Loaded Messages : *${loadedx}*\n\nSilahkan invite bot lagi jika dibutuhkan`)
                await aruga.leaveGroup(gclist.contact.id)
                await aruga.deleteChat(gclist.contact.id)
            }
            aruga.reply(from, 'Success leave all group!', id)
            break
        case 'clearall': //menghapus seluruh pesan diakun bot
            if (!isOwnerBot) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChatx = await aruga.getAllChats()
            for (let dchat of allChatx) {
                await aruga.deleteChat(dchat.id)
            }
            aruga.reply(from, 'Success clear all chat!', id)
            break
        default:
            break
        case 'adminlist':
            if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await aruga.sendTextWithMentions(from, mimin)
            break
        case 'howmuch':
            if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa digunakan dalam Grup')
            const tulul = name
            const yaelah = chat.groupMetadata.participants.length
                await aruga.sendText(from, `Total Member in *${tulul}* is : *${yaelah}*\n\nBy : Toin` )
                break
        case 'ownergrup':
            if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await aruga.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break
        }
		
		// Simi-simi function
		if ((!isCmd && isGroupMsg && isSimi) && message.type === 'chat') {
			axios.get(`https://arugaz.herokuapp.com/api/simisimi?kata=${encodeURIComponent(message.body)}&apikey=${apiSimi}`)
			.then((res) => {
				if (res.data.status == 403) return aruga.sendText(ownerNumber, `${res.data.result}\n\n${res.data.pesan}`)
				aruga.reply(from, `Simi berkata: ${res.data.result}`, id)
			})
			.catch((err) => {
				aruga.reply(from, `${err}`, id)
			})
		}
		
		// Kata kasar function
		if(!isCmd && isGroupMsg && isNgegas) {
            const find = db.get('group').find({ id: groupId }).value()
            if(find && find.id === groupId){
                const cekuser = db.get('group').filter({id: groupId}).map('members').value()[0]
                const isIn = inArray(pengirim, cekuser)
                if(cekuser && isIn !== false){
                    if(isKasar){
                        const denda = db.get('group').filter({id: groupId}).map('members['+isIn+']').find({ id: pengirim }).update('denda', n => n + 5000).write()
                        if(denda){
                            await aruga.reply(from, "Jangan badword bodoh\nDenda +5.000\nTotal : Rp"+formatin(denda.denda), id)
                        }
                    }
                } else {
                    const cekMember = db.get('group').filter({id: groupId}).map('members').value()[0]
                    if(cekMember.length === 0){
                        if(isKasar){
                            db.get('group').find({ id: groupId }).set('members', [{id: pengirim, denda: 5000}]).write()
                        } else {
                            db.get('group').find({ id: groupId }).set('members', [{id: pengirim, denda: 0}]).write()
                        }
                    } else {
                        const cekuser = db.get('group').filter({id: groupId}).map('members').value()[0]
                        if(isKasar){
                            cekuser.push({id: pengirim, denda: 5000})
                            await aruga.reply(from, "Jangan badword bodoh\nDenda +5.000", id)
                        } else {
                            cekuser.push({id: pengirim, denda: 0})
                        }
                        db.get('group').find({ id: groupId }).set('members', cekuser).write()
                    }
                }
            } else {
                if(isKasar){
                    db.get('group').push({ id: groupId, members: [{id: pengirim, denda: 5000}] }).write()
                    await aruga.reply(from, "Jangan badword bodoh\nDenda +5.000\nTotal : Rp5.000", id)
                } else {
                    db.get('group').push({ id: groupId, members: [{id: pengirim, denda: 0}] }).write()
                }
            }
        }
    } catch (err) {
        console.log(color('[EROR]', 'red'), err)
    }
}
