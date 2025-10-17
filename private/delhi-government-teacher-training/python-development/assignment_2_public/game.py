import pygame
import sys


class Enemies:
    def __init__(self, no_of_enemies):
        self.enemies = []
        self.hvel = 5
        self.vvel = 20
        for i in range(no_of_enemies):
            enemy = pygame.Rect(0, 0, 50, 30)
            enemy.center = ((i + 1) * 500 // (no_of_enemies + 1), 100)
            self.enemies.append(enemy)

    def draw(self, screen, ship=None):
        for enemy in self.enemies:
            if ship == None:
                pygame.draw.rect(screen, (255, 0, 0), enemy)
            else:
                screen.blit(ship, enemy)

    def move(self):
        move_down = False
        for enemy in self.enemies:
            if enemy.midright[0] >= 500 or enemy.midleft[0] <= 0:
                self.hvel = -self.hvel
                move_down = True
            enemy.move_ip(self.hvel, 0)
        if move_down:
            for enemy in self.enemies:
                enemy.move_ip(0, self.vvel)


class Bullet:
    def __init__(self, x, y):
        self.rect = pygame.Rect(0, 0, 5, 10)
        self.rect.center = (x, y)
        self.vel = -10

    def move(self):
        self.rect.move_ip(0, self.vel)
        return self.rect.y >= 0

    def draw(self, screen):
        pygame.draw.rect(screen, (255, 255, 255), self.rect)


class Bullets:
    def __init__(self):
        self.bullets = []

    def move(self):
        bullets = []
        for bullet in self.bullets:
            ret = bullet.move()
            if ret:
                bullets.append(bullet)

        self.bullets = bullets

    def draw(self, screen):
        for bullet in self.bullets:
            bullet.draw(screen)

    def add(self, x, y):
        self.bullets.append(Bullet(x, y))

    def kill(self, enemies):
        bullets = []
        killCount = 0
        for bullet in self.bullets:
            ix = bullet.rect.collidelist(enemies)
            if ix != -1:
                enemies.pop(ix)
                killCount += 1
            else:
                bullets.append(bullet)
        self.bullets = bullets
        return killCount


pygame.init()
screen = pygame.display.set_mode((500, 500))
pygame.display.set_caption("Space Game")
screenfont = pygame.font.SysFont(None, 20)
screenblast = pygame.mixer.Sound("zap.mp3")
game_over = True

player = pygame.Rect(0, 0, 50, 50)
player.midbottom = screen.get_rect().midbottom

playerShip = pygame.image.load("ship.png")
playerShip = pygame.transform.scale(playerShip, (50, 50))
enemyShip = pygame.image.load("ufo.png")
enemyShip = pygame.transform.scale(enemyShip, (50, 50))

enemies = Enemies(5)
bullets = Bullets()
clock = pygame.time.Clock()

score = 0

while True:
    clock.tick(10)  # 10 fps
    screen.fill((0, 0, 0))

    if game_over:
        scoreText = screenfont.render(
            "Game Over        Your Score: " + str(score), True, (255, 255, 255)
        )
        scoreRect = scoreText.get_rect()
        scoreRect.center = screen.get_rect().center
        screen.blit(scoreText, scoreRect)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                game_over = False
                enemies = Enemies(5)
                bullets.bullets = []
                player.midbottom = screen.get_rect().midbottom
    else:

        bullets.move()

        kill_count = bullets.kill(enemies.enemies)
        if kill_count > 0:
            score += kill_count
            screenblast.play()

        enemies.draw(screen, enemyShip)
        enemies.move()
        bullets.draw(screen)

        screen.blit(playerShip, player)

        scoreText = screenfont.render("Score: " + str(score), True, (255, 255, 255))
        scoreRect = scoreText.get_rect()
        scoreRect.topleft = screen.get_rect().topleft
        screen.blit(scoreText, scoreRect)

        if len(enemies.enemies) == 0 or player.collidelist(enemies.enemies) != -1:
            game_over = True

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    x, y = player.center
                    bullets.add(x, y)
                if event.key == pygame.K_LEFT:
                    player.move_ip(-4, 0)
                if event.key == pygame.K_RIGHT:
                    player.move_ip(4, 0)

    pygame.display.flip()
