function loadMap () {
    tiles.setCurrentTilemap(World[TY][TX])
    for (let X = 0; X <= 20; X++) {
        for (let Y = 0; Y <= 15; Y++) {
            if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(X, Y), assets.tile`transparency8`))) {
                tiles.setWallAt(tiles.getTileLocation(X, Y), true)
            }
        }
    }
}
function CreatePlayer () {
    mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
    controller.moveSprite(mySprite, 75, 75)
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
    console.logValue("x", mySprite.x)
    console.logValue("y", mySprite.y)
})
function Init () {
    World = [
    [tileUtil.createSmallMap(tilemap`level1`), tileUtil.createSmallMap(tilemap`level3`)],
    [tileUtil.createSmallMap(tilemap`level1`), tileUtil.createSmallMap(tilemap`level3`)],
    [],
    []
    ]
    TX = 0
    TY = 0
    items = [Inventory.create_item("Sword", transformSprites.scale2x(assets.image`swordBasic`)), Inventory.create_item("Gem", transformSprites.scale2x(assets.image`Gem`))]
    toolbar = Inventory.create_toolbar([items[0], items[1]], 2)
    toolbar.set_color(ToolbarColorAttribute.BoxSelectedOutline, 12)
    toolbar.setPosition(23, 12)
    scene.setBackgroundColor(10)
}
let toolbar: Inventory.Toolbar = null
let items: Inventory.Item[] = []
let mySprite: Sprite = null
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
        mySprite.y = 117
        TY += -1
        loadMap()
    } else if (mySprite.y == 116) {
        mySprite.y = 29
        TY += 1
        loadMap()
    }
})
