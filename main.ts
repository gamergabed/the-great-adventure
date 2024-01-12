function loadMap (TX: number, TY: number) {
    tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level1`))
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
function Init () {
    items = [Inventory.create_item("Sword", transformSprites.scale2x(assets.image`swordBasic`)), Inventory.create_item("Gem", transformSprites.scale2x(assets.image`Gem`))]
    toolbar = Inventory.create_toolbar([items[0], items[1]], 2)
    toolbar.set_color(ToolbarColorAttribute.BoxSelectedOutline, 12)
    toolbar.setPosition(23, 12)
    scene.setBackgroundColor(10)
}
let toolbar: Inventory.Toolbar = null
let items: Inventory.Item[] = []
let mySprite: Sprite = null
Init()
loadMap(1, 1)
CreatePlayer()
