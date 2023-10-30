import pygame
import random
import sys

hs_file = "highscore.dat"

pygame.init()
player_ship = pygame.image.load("player.png")
invader_ship = pygame.image.load("invader.png")


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
        self.rect.center = tuple(pos_tuple)
        self.vel = tuple(vel_tuple)
        self.__init_pos__ = tuple(pos_tuple)

    def update(self, screen, pos_tuple=(0, 0), vel_tuple=None, sync=False):
        if sync == True:
            if self.isJumpting == True:
                return
            else:
                self.isJumpting = True
        if vel_tuple != None:
            self.vel = vel_tuple

        currPosX, currPosY = self.rect.center
        deltaX = self.vel[0] + pos_tuple[0]
        deltaY = self.vel[1] + pos_tuple[1]
        newPosX = currPosX + deltaX
        newPosY = currPosY + deltaY
        screenRect = screen.get_rect()

        # add gravity along Y-Axis
        gammaY = newPosY - self.__init_pos__[1]

        if abs(gammaY) <= abs(self.vel[1] / 2):
            self.vel = (self.vel[0], 0)
            self.rect.center = tuple(self.__init_pos__)
            self.isJumpting = False
        elif newPosY <= screenRect.height / 2:
            self.vel = (self.vel[0], -self.vel[1])

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

    def __init__(self, caption, size_tuple, max_invaders=3):
        pygame.display.set_caption(caption)
        self.caption = caption
        self.captionFont = pygame.font.SysFont(None, 52)
        self.font = pygame.font.SysFont(None, 24)
        self.screen = pygame.display.set_mode(size_tuple)
        self.maxInvaders = max_invaders
        self.invaders = pygame.sprite.Group()
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
        for invaderCount in range(0, self.maxInvaders):
            self.invaders.add(
                Item(
                    invader_ship,
                    (255, 0, 0),
                    (64, 32),
                    (
                        screenRect.right,
                        random.randint(
                            int(screenRect.height / 2), screenRect.height - 70
                        ),
                    ),
                    (-12, 0),
                )
            )
        self.player.add(
            Item(
                player_ship,
                (0, 0, 255),
                (32, 64),
                (160, (screenRect.height - 96)),
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

    def render_game(self):
        allPlayers = self.player.sprites()
        allInvaders = self.invaders.sprites()
        screenRect = self.screen.get_rect()

        # Shift Invaders
        # Update Score
        newInvaderPos = None
        for invader in allInvaders:
            if invader.rect.left <= screenRect.left:
                newInvaderPos = (
                    screenRect.right - invader.rect.centerx,
                    random.randint(int(screenRect.height / 2), screenRect.height - 70)
                    - invader.rect.centery,
                )
                self.score += 1

        # Player Dead
        playerCollision = pygame.sprite.groupcollide(
            self.player, self.invaders, False, False
        )
        playerDead = False
        for player in allPlayers:
            if playerCollision.get(player, None) != None:
                playerDead = True
                self.end("You Died")
                continue

        # Update High-Score
        if self.highScore < self.score:
            self.highScore = self.score
        # Update Invaders
        if newInvaderPos == None:
            self.invaders.update(self.screen)
        else:
            self.invaders.update(self.screen, newInvaderPos)
        # Update Player
        self.player.update(self.screen)

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
                if event.key == pygame.K_SPACE:
                    self.player.update(
                        self.screen, pos_tuple=(0, 0), vel_tuple=(0, -8), sync=True
                    )

    def tick_game(self):
        # Blank
        self.screen.fill((16, 128, 32))
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


Space("DRONE RUN", size_tuple=(800, 600), max_invaders=1).render()
