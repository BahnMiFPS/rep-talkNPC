local NPC = {}
local npcId = 0
local currentNPC = nil
local cam
local camRotation
local interect = false
local dialog = {}

local function CreateCam()
    local px, py, pz = table.unpack(GetEntityCoords(currentNPC.npc, true))
    local x, y, z = px + GetEntityForwardX(currentNPC.npc) * 1.2, py + GetEntityForwardY(currentNPC.npc) * 1.2,
        pz + 0.52
    local rx = GetEntityRotation(currentNPC.npc, 2)
    camRotation = rx + vector3(0.0, 0.0, 181.0)
    cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", x, y, z, camRotation, GetGameplayCamFov())
    SetCamActive(cam, true)
    RenderScriptCams(true, true, 1000, 1, 1)
end

local function changeDialog(_label, _elements)
    SendReactMessage("changeDialog", {
        msg = _label, -- thanh tin nhắn
        elements = _elements
    })
    dialog = _elements
end

local function updateMessage(label)
    SendReactMessage("updateMessage", {
        msg = label
    })
end

local function talkNPC(_id)
    local npc = NPC[_id]
    currentNPC = npc
    CreateCam()
    interect = true
    SetNuiFocus(true, true)
    SendReactMessage("show", {
        msg = npc.startMSG,
        elements = npc.elements,
        npcName = npc.name,
        npcTag = npc.tag,
        npcColor = npc.color
    })
    dialog = npc.elements
end

local function CreateNPC(_pedData, _elements)
    npcId = npcId + 1
    RequestModel(GetHashKey(_pedData.npc))
    while not HasModelLoaded(GetHashKey(_pedData.npc)) do
        Wait(1)
    end
    local ped = CreatePed(0, GetHashKey(_pedData.npc), _pedData.coords.x, _pedData.coords.y, _pedData.coords.z,
        _pedData.coords.w, false, true)
    SetEntityHeading(ped, _pedData.coords.w)
    SetPedFleeAttributes(ped, 0, 0)
    SetPedDiesWhenInjured(ped, false)
    SetPedKeepTask(ped, true)
    SetBlockingOfNonTemporaryEvents(ped, true)
    SetEntityInvincible(ped, true)
    FreezeEntityPosition(ped, true)
    TaskLookAtEntity(ped, PlayerPedId(), -1, 2048, 3)
    SetModelAsNoLongerNeeded(GetHashKey(_pedData.npc))
    if _pedData.animName then
        RequestAnimDict(_pedData.animName)
        while not HasAnimDictLoaded(_pedData.animName) do
            Wait(1)
        end
        TaskPlayAnim(ped, _pedData.animName, _pedData.animDist, 8.0, 0.0, -1, 1, 0, 0, 0, 0)
    elseif _pedData.animScenario then
        TaskStartScenarioInPlace(ped, _pedData.animScenario, 0, true)
    end
    exports[Config.Target]:AddTargetEntity(ped, {
        options = { {
            type = "client",
            action = function(entity)
                talkNPC(entity)
            end,
            icon = "fas fa-user-friends",
            label = Config.Talk:format(_pedData.name)
        } },
        distance = 3.0
    })
    NPC[ped] = {
        id = npcId,
        npc = ped,
        resource = GetInvokingResource(),
        coords = _pedData.coords,
        name = _pedData.name,
        tag = _pedData.tag,
        color = _pedData.color,
        startMSG = _pedData.startMSG or 'Hello',
        elements = _elements
    }
    return ped
end

RegisterNUICallback('close', function()
    currentNPC = nil
    interect = false
    SetNuiFocus(false, false)
    ClearFocus()
    RenderScriptCams(false, true, 1000, true, false)
    DestroyCam(cam, false)
    SetEntityAlpha(PlayerPedId(), 255, false)
    cam = nil
    dialog = {}
end)

RegisterNUICallback('getConfig', function(_, cb)
    cb({
        primaryColor = Config.Color.primaryColor,
        secondaryColor = Config.Color.secondaryColor
    })
end)

RegisterNetEvent('rep-talkNPC:client:close', function()
    SendReactMessage('close')
end)

RegisterNUICallback('click', function(_data) -- truyền xuống data.value là id của elementss
    SetPedTalk(currentNPC.npc)
    if dialog[_data + 1].shouldClose then
        SendReactMessage('close')
    end
    dialog[_data + 1].action()
end)

exports('CreateNPC', function(...)
    return CreateNPC(...)
end)

exports('changeDialog', function(...)
    changeDialog(...)
end)

exports('updateMessage', function(...)
    updateMessage(...)
end)

CreateThread(function()
    while true do
        if currentNPC and interect == true then
            local ped = PlayerPedId()
            local pos = GetEntityCoords(ped)
            if #(pos - vector3(currentNPC.coords.x,currentNPC.coords.y, currentNPC.coords.z)) > 5 then
                SetNuiFocus(false, false)
                ClearFocus()
                RenderScriptCams(false, true, 1000, true, false)
                DestroyCam(cam, false)
                SetEntityAlpha(PlayerPedId(), 255, false)
                cam = nil
                currentNPC = nil
                interect = false
                SendReactMessage('close')
            end
        end
        Wait(500)
    end
end)

AddEventHandler('onResourceStop', function(_resource)
    for k, v in pairs(NPC) do
        if v.resource == _resource then
            DeleteEntity(k)
        end
    end
end)
