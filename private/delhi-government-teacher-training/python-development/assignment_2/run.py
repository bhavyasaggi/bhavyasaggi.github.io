import pygame
import random
import sys

hs_file = "highscore.dat"

pygame.mixer.init()
pygame.init()
pygame.key.set_repeat(100)
bg_sound = pygame.mixer.Sound("ocean.mp3")
boom_sound = pygame.mixer.Sound("boom.mp3")
player_ship = pygame.image.load("player.png")
invader_ship = pygame.image.load("invader.png")
bullet_ship = pygame.image.load("bullet.png")
boom_ship = pygame.image.load("boom.png")


class Item(pygame.sprite.Sprite):
    def __init__(
        self,
        design=None,
        color_tuple=(0, 0, 0),
        size_tuple=(50, 50),
        pos_tuple=(0, 0),
        vel_tuple=(0, 0),
    ):
        super().__init__()
        if design == None:
            self.image = pygame.Surface(list(size_tuple))
            self.image.fill(color_tuple)
        else:
            self.image = design
            self.image = pygame.transform.scale(self.image, size_tuple)
        self.rect = self.image.get_rect()
        self.rect.center = pos_tuple
        self.vel = vel_tuple

    def update(self, screen, pos_tuple=(0, 0), vel_tuple=None):
        currPosX, currPosY = self.rect.center
        self.vel = vel_tuple if vel_tuple != None else self.vel
        deltaX = self.vel[0] + pos_tuple[0]
        deltaY = self.vel[1] + pos_tuple[1]
        newPosX = currPosX + (
            (deltaX + self.rect.width) if deltaX >= 0 else (deltaX - self.rect.width)
        )
        newPosY = currPosY + (
            (deltaY + self.rect.height) if deltaY >= 0 else (deltaY - self.rect.height)
        )
        screenRect = screen.get_rect()
        # prevent moving out of screen
        if (
            newPosX > screenRect.left
            and newPosX < screenRect.right
            and newPosY > screenRect.top
            and newPosY < screenRect.bottom
        ):
            self.rect.center = (currPosX + deltaX, currPosY + deltaY)


class Space:
    clock = pygame.time.Clock()

    def __init__(
        self,
        caption,
        size_tuple,
        max_invaders=3,
        max_bullets=10,
    ):
        pygame.display.set_caption(caption)
        pygame.mixer.Channel(0).set_volume(0.4)
        pygame.mixer.Channel(0).play(bg_sound, -1)
        self.caption = caption
        self.captionFont = pygame.font.SysFont(None, 52)
        self.font = pygame.font.SysFont(None, 24)
        self.screen = pygame.display.set_mode(size_tuple)
        self.maxBullets = max_bullets
        self.bullets = pygame.sprite.Group()
        self.booms = pygame.sprite.Group()
        self.invaders = pygame.sprite.Group()
        self.maxInvaders = max_invaders
        self.player = pygame.sprite.Group()
        self.start()
        self.isOver = True

    def start(self):
        hs_dat = open(hs_file, "r")
        hs_val = hs_dat.read()
        self.highScore = 0 if hs_val == "" else int(hs_val)
        self.score = 0
        self.status = ""
        hs_dat.close()
        self.invaders.empty()
        self.player.empty()
        screenRect = self.screen.get_rect()
        invaderPosX, invaderPosY = (0, 0)
        invaderRow = 0
        invaderRowCount = screenRect.height // 128 - 1
        if invaderRowCount >= 0:
            for invaderIndex in range(0, self.maxInvaders):
                if invaderIndex % invaderRowCount == 0:
                    invaderRow += 1
                # Creates a random-like pattern
                invaderPosX = (
                    random.randrange(128, 256)
                    + (invaderIndex - ((invaderRow - 1) * invaderRowCount)) * 128
                )
                invaderPosY = invaderRow * 64
                self.invaders.add(
                    Item(
                        invader_ship,
                        (255, 0, 0),
                        (64, 64),
                        (invaderPosX, invaderPosY),
                        (1, 0),
                    )
                )
        self.player.add(
            Item(
                player_ship,
                (0, 0, 255),
                (64, 64),
                ((screenRect.width / 2), (screenRect.height - 70)),
            )
        )
        self.isOver = False

    def end(self, status=""):
        hs_dat = open(hs_file, "w")
        hs_dat.write(str(self.highScore))
        hs_dat.close()
        self.status = status
        self.isOver = True

    def render(self):
        while True:
            # 30 fps
            Space.clock.tick(30)
            if self.isOver:
                self.tick_intro()
            else:
                self.tick_game()
            # Clear
            pygame.display.flip()

    def add_bullet(self):
        if len(self.bullets.sprites()) >= self.maxBullets:
            return
        # if len(self.player.sprites() == 0):
        #     self.end("You Lost")
        #     return
        playerCenter = self.player.sprites()[0].rect.center
        self.bullets.add(
            Item(bullet_ship, (255, 255, 255), (16, 16), playerCenter, (0, -8))
        )

    def render_game(self):
        allPlayers = self.player.sprites()
        allBullets = self.bullets.sprites()
        allInvaders = self.invaders.sprites()
        screenRect = self.screen.get_rect()

        if len(allInvaders) == 0:
            self.end("You Won")
            return

        # Shift Invaders
        newInvaderVel = None
        for invader in allInvaders:
            if (
                invader.rect.right + invader.rect.width >= screenRect.right
                or invader.rect.left - invader.rect.width <= screenRect.left
            ):
                newInvaderVel = (-1 * invader.vel[0], invader.vel[1])
                break

        # Kill Invaders
        kill_dict = pygame.sprite.groupcollide(self.bullets, self.invaders, True, True)
        kill_set = set()
        for bullet in allBullets:
            # Expire Bullet
            if bullet.rect.top - bullet.rect.height <= screenRect.top:
                bullet.kill()
            # Get Kill Set
            if kill_dict.get(bullet, None) != None:
                kill_set = kill_set.union(kill_dict[bullet])

        # Player Dead
        playerCollision = pygame.sprite.groupcollide(
            self.player, self.invaders, True, False
        )
        playerDead = False
        for player in allPlayers:
            if playerCollision.get(player, None) != None:
                playerDead = True
                self.end("You Died")
                continue

        # Use Kill Set to create boom
        if len(kill_set) != 0 or playerDead == True:
            pygame.mixer.Channel(1).stop()
            pygame.mixer.Channel(1).play(boom_sound, 0)

        # Update Score
        self.score += len(kill_set)
        # Update High-Score
        if self.highScore < self.score:
            self.highScore = self.score
        # Update Bullets
        self.bullets.update(self.screen)
        # Update Invaders
        if newInvaderVel == None:
            self.invaders.update(self.screen)
        else:
            self.invaders.update(self.screen, (0, 92), newInvaderVel)

        # Render-Score
        scoreImage = self.font.render(
            "Score: " + str(self.score), True, (255, 255, 255)
        )
        scoreRect = scoreImage.get_rect()
        scoreRect.topright = self.screen.get_rect().topright
        self.screen.blit(scoreImage, scoreRect)

        highScoreImage = self.font.render(
            "High-Score: " + str(self.highScore), True, (255, 255, 255)
        )
        highScoreRect = highScoreImage.get_rect()
        highScoreRect.topleft = self.screen.get_rect().topleft
        self.screen.blit(highScoreImage, highScoreRect)

        # Render-Draw
        self.bullets.draw(self.screen)
        self.invaders.draw(self.screen)
        self.player.draw(self.screen)

    def event_intro_actions(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()
            if event.type == pygame.KEYDOWN:
                # Start Key
                if event.key == pygame.K_SPACE:
                    self.start()

    def event_game_actions(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()
            if event.type == pygame.KEYDOWN:
                # Pause Key
                if event.key == pygame.K_SPACE:
                    self.add_bullet()
                if event.key == pygame.K_LEFT:
                    self.player.update(self.screen, (-4, 0))
                if event.key == pygame.K_RIGHT:
                    self.player.update(self.screen, (4, 0))

    def tick_game(self):
        # Blank
        self.screen.fill((32, 64, 128))
        # Render
        self.render_game()
        # Handle Events
        self.event_game_actions()

    def tick_intro(self):
        # Blank
        self.screen.fill((32, 64, 128))
        screenCenter = self.screen.get_rect().center

        statusImage = self.font.render(str(self.status), True, (255, 255, 255))
        statusRect = statusImage.get_rect()
        statusRect.center = (
            screenCenter[0],
            60,
        )
        self.screen.blit(statusImage, statusRect)

        captionImage = self.captionFont.render(str(self.caption), True, (63, 127, 255))
        captionRect = captionImage.get_rect()
        captionRect.center = screenCenter
        self.screen.blit(captionImage, captionRect)

        highscoreImage = self.font.render(
            "High Score: " + str(self.highScore), True, (255, 255, 255)
        )
        highscoreRect = highscoreImage.get_rect()
        highscoreRect.center = (
            captionRect.center[0],
            captionRect.center[1] + 2 * captionRect.height,
        )
        self.screen.blit(highscoreImage, highscoreRect)

        startImage = self.font.render("Press [Space] to Start", True, (32, 128, 64))
        startRect = startImage.get_rect()
        startRect.center = (
            highscoreRect.center[0],
            highscoreRect.center[1] + 4 * captionRect.height,
        )
        self.screen.blit(startImage, startRect)

        # Handle Events
        self.event_intro_actions()


Space("SHIP INVADERS", size_tuple=(800, 600), max_invaders=12, max_bullets=8).render()
