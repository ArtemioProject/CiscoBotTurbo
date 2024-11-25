import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import fg from 'api-dylux';

const handler = async (m, { command, usedPrefix, conn, text }) => {
    if (!text) throw `${mg}${mid.smsMalused4}\n*${usedPrefix + command} Billie Eilish - Bellyache*`;

    try {
        if (command === 'playaudio') {
            conn.reply(m.chat, lenguajeGB['smsAvisoEG']() + mid.smsAud, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        description: null,
                        title: wm,
                        body: '𝗖𝗶𝘀𝗰𝗼 𝗕𝗼𝘁 𝗧𝘂𝗿𝗯𝗼',
                        previewType: 0,
                        thumbnail: gataImg,
                        sourceUrl: accountsgb
                    }
                }
            });

            try {
                // Obtener el JSON de la API
                const res = await fetch(`https://skizo.tech/api/y2mate?apikey=GataDios&url=${encodeURIComponent(text)}`);
                const json = await res.json();

                // Verificar si hay un enlace de conversión
                if (json.convert) {
                    // Enviar el audio
                    await conn.sendMessage(m.chat, {
                        audio: { url: json.convert },
                        fileName: `audio.mp3`,
                        mimetype: 'audio/mp4'
                    }, { quoted: m });
                } else {
                    throw new Error('No se pudo obtener el enlace de conversión.');
                }
            } catch (e) {
                console.error('Error al obtener el audio:', e);
                await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, m);
            }
        }

        if (command === 'playvideo') {
            conn.reply(m.chat, lenguajeGB['smsAvisoEG']() + mid.smsVid, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        description: null,
                        title: wm,
                        body: '𝗖𝗶𝘀𝗰𝗼 𝗕𝗼𝘁 𝗧𝘂𝗿𝗯𝗼',
                        previewType: 0,
                        thumbnail: gataImg,
                        sourceUrl: accountsgb
                    }
                }
            });

            try {
                const mediaa = await ytPlayVid(text);
                const aa_2 = await conn.sendMessage(m.chat, {
                    video: { url: mediaa.result },
                    fileName: `error.mp4`,
                    caption: `${wm}`,
                    thumbnail: mediaa.thumb,
                    mimetype: 'video/mp4'
                }, { quoted: m });

                if (!aa_2) {
                    throw new Error();
                }
            } catch {
                try {
                    let res0 = await yts(text);
                    res0 = res0.videos[0];
                    let yt0 = await fg.ytv(res0.url, '360p');
                    await conn.sendFile(m.chat, yt0.dl_url, 'error.mp4', `${wm}`, m);
                } catch {
                    const res = await fetch(`https://skizo.tech/api/y2mate?apikey=GataDios&url=${encodeURIComponent(text)}`);
                    const json = await res.json();
                    await conn.sendFile(m.chat, json.result.video, 'error.mp4', `${wm}`, m);
                }
            }
        }
    } catch (e) {
        await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, m);
        console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`);
        console.log(e);
        handler.limit = 0; // No gastar límite si fallas
    }
};

handler.help = ['playaudio', 'playvideo'].map(v => v + ' <texto>');
handler.tags = ['downloader'];
handler.command = ['playaudio', 'playvideo'];
handler.limit = 1;

export default handler;


