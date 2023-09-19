fx_version 'cerulean'
game 'gta5'

name "Rep Dev - Talk with NPC Ver 2"
author "Q4D#1905 x BahnMiFPS#8508"
version "1.0.0"

client_scripts {'@hotp/build/client/token.lua', 'client/*.lua'}
ui_page 'web/build/index.html'
files {'web/build/index.html', 'web/build/**/*'}

shared_script 'config.lua'
lua54 'yes'
