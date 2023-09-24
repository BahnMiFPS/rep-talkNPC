RegisterCommand("testnpc", function()
    local coords = GetEntityCoords(PlayerPedId()) - vector3(0.5, 0.5, 1.0)
    local npc = exports['rep-talkNPC']:CreateNPC({
        npc = 'u_m_y_abner',
        coords = vector4(coords.x, coords.y, coords.z, 0.0),
        name = 'Rep Scripts',
        animName = "mini@strip_club@idles@bouncer@base",
        animDist = "base",
        tag = "Bot",
        color = "blue.7",
        startMSG = 'Hello, I am the Rep Scripts Bot'
    }, {
        [1] = {
            label = "What is Rep Scripts?",
            shouldClose = false,
            action = function()
                exports['rep-talkNPC']:updateMessage("It is a team that creates scripts for FiveM")
            end
        },
        [2] = {
            label = "What categories of scripts do you have?",
            shouldClose = false,
            action = function()
                exports['rep-talkNPC']:changeDialog("We have clean and dirty jobs, which one do you want to choose?",
                    {
                        [1] = {
                            label = "Clean jobs",
                            shouldClose = true,
                            action = function()
                            end
                        },
                        [2] = {
                            label = "Dirty jobs",
                            shouldClose = true,
                            action = function()
                            end
                        }
                    }
                )
            end
        },
        [3] = {
            label = "Goodbye",
            shouldClose = true,
            action = function()
                TriggerEvent('rep-talkNPC:client:close')
            end
        }
    })
end)


-- below is what we used in the featured video for our sanitation job
-- function CreatePeds()
--         Boss = exports['rep-talkNPC']:CreateNPC({
--             npc = 's_m_y_garbage',
--             coords = vector3(Config.BossLocation.x, Config.BossLocation.y, Config.BossLocation.z - 1.0),
--             heading = Config.BossLocation.w,
--             name = 'Brook Stream',
--             animScenario = 'WORLD_HUMAN_CLIPBOARD',
--             position = "Environmental Worker",
--             color = "#00736F",
--             startMSG = 'Hello, how can I assist you?'
--         }, {
--             [1] = {
--                 label = "How does this job work?",
--                 shouldClose = false,
--                 action = function()
--                     exports['rep-talkNPC']:changeDialog({
--                         label = "Hello, are you new here? I will guide you! \n \n First, you need to have a tablet. Then take the job here. \n \n You can work faster with your homies. You guys can go up to 4 people and will have to go to 2 districts in the city in one trip. \n \n Oh, a tip is that the food from Cafe Meow Uwu will help you stay alert to achieve better work efficiency.",
--                         shouldClose = false,
--                         elements = {
--                             [1] = {
--                                 label = "I want to start working",
--                                 shouldClose = false,
--                                 action = function()
--                                     if onDuty == false then
--                                         if LocalPlayer.state.nghe == nil or LocalPlayer.state.nghe == "sani" then
--                                             exports['rep-talkNPC']:updateMessage(
--                                                 "Now turn on your tablet to find or create a group for yourself!")
--                                             Wait(1000)
--                                             TriggerEvent('rep-talkNPC:client:close')
--                                             TriggerEvent('rep-sanitation:client:duty')
--                                         else
--                                             Notification(Config.Lang['error_ownjob'].label,
--                                                 Config.Lang['error_ownjob'].type, Config.Lang['error_ownjob'].time)
--                                         end
--                                     else
--                                         exports['rep-talkNPC']:updateMessage("You already have this job")
--                                     end
--                                 end
--                             },
--                             [2] = {
--                                 label = "Oh, it doesn't seem to suit me",
--                                 shouldClose = true,
--                                 action = function()
--                                 end
--                             }
--                         }
--                     })
--                 end
--             },
--             [2] = {
--                 label = "I want to take/quit the job",
--                 shouldClose = false,
--                 action = function()
--                     if onDuty == true then
--                         exports['rep-talkNPC']:updateMessage("It's sad to say goodbye to you")
--                         Wait(2000)
--                         TriggerEvent('rep-sanitation:client:offduty')
--                         TriggerEvent('rep-talkNPC:client:close')
--                     else
--                         if LocalPlayer.state.nghe == nil or LocalPlayer.state.nghe == "sani" then
--                             exports['rep-talkNPC']:updateMessage(
--                                 "Now turn on your tablet to find or create a group for yourself!")
--                             Wait(2000)
--                             TriggerEvent('rep-talkNPC:client:close')
--                             TriggerEvent('rep-sanitation:client:duty')
--                         else
--                             Notification(Config.Lang['error_ownjob'].label, Config.Lang['error_ownjob'].type,
--                                 Config.Lang['error_ownjob'].time)
--                         end
--                     end
--                 end
--             },
--             [3] = {
--                 label = "I want to exchange recyclable materials",
--                 shouldClose = true,
--                 action = function()
--                     TriggerEvent('rep-sanitation:client:tranfer')
--                 end
--             },
--             [4] = {
--                 label = "I'm just passing by",
--                 shouldClose = true,
--                 action = function()
--                 end
--             }
--         })
-- end
