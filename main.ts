function loadMap () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        sprites.destroy(value)
    }
    tiles.setCurrentTilemap(World[TY][TX])
    for (let X = 0; X <= 20; X++) {
        for (let Y = 0; Y <= 15; Y++) {
            if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(X, Y), assets.tile`transparency8`))) {
                tiles.setWallAt(tiles.getTileLocation(X, Y), true)
            }
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`MapSPINNER`)) {
        ENEMI = sprites.create(assets.image`test`, SpriteKind.Enemy)
    }
    music.play(music.stringPlayable("G - B - - - - - ", 800), music.PlaybackMode.InBackground)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of itemsForShow) {
        if (toolbar.get_items()[1] == value) {
            ProItem = sprites.createProjectileFromSprite(itemSmolImages[itemsForShow.indexOf(value)], mySprite, NUM_Elif(ItemDIR, 100, -100), 0)
            ProItem.lifespan = 150
        }
    }
})
function CreatePlayer () {
    mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
    controller.moveSprite(mySprite, 75, 75)
    mySprite.setStayInScreen(true)
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`walkUp`,
    200,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`walkDown`,
    200,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`walkRight`,
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`walkLeft`,
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of itemsForShow) {
        if (toolbar.get_items()[0] == value) {
            ProItem = sprites.createProjectileFromSprite(itemSmolImages[itemsForShow.indexOf(value)], mySprite, NUM_Elif(ItemDIR, 100, -100), 0)
            ProItem.lifespan = 150
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    ItemDIR = false
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    ItemDIR = true
})
function NUM_Elif (Bool: boolean, A: number, B: number) {
    if (Bool) {
        return A
    } else {
        return B
    }
}
function Init () {
    ItemDIR = true
    World = [
    [tileUtil.createSmallMap(tilemap`level4`), tileUtil.createSmallMap(tilemap`level5`)],
    [tileUtil.createSmallMap(tilemap`level6`), tileUtil.createSmallMap(tilemap`level0`)],
    [],
    []
    ]
    TX = 0
    TY = 0
    itemSmolImages = [assets.image`swordBasic`, assets.image`Gem`]
    itemsForShow = [Inventory.create_item("Sword", transformSprites.scale2x(assets.image`swordBasic`)), Inventory.create_item("Gem", transformSprites.scale2x(assets.image`Gem`))]
    toolbar = Inventory.create_toolbar([itemsForShow[0], itemsForShow[1]], 2)
    toolbar.set_color(ToolbarColorAttribute.BoxSelectedOutline, 12)
    toolbar.setPosition(23, 12)
    scene.setBackgroundImage(assets.image`backgroundTest`)
}
let ItemDIR = false
let mySprite: Sprite = null
let itemSmolImages: Image[] = []
let ProItem: Sprite = null
let toolbar: Inventory.Toolbar = null
let itemsForShow: Inventory.Item[] = []
let ENEMI: Sprite = null
let TX = 0
let TY = 0
let World: tiles.TileMapData[][] = []
Init()
CreatePlayer()
loadMap()
game.onUpdate(function () {
    if (mySprite.x == 4) {
        mySprite.x = 155
        TX += -1
        loadMap()
    } else if (mySprite.x == 156) {
        mySprite.x = 5
        TX += 1
        loadMap()
    } else if (mySprite.y == 28) {
        mySprite.y = 115
        TY += -1
        loadMap()
    } else if (mySprite.y == 116) {
        mySprite.y = 29
        TY += 1
        loadMap()
    }
})
