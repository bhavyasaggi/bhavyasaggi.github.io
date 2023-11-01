import pygame
import random
import sys

pygame.init()
screen = pygame.display.set_mode((500, 500))
pygame.display.set_caption("Jump")
clock = pygame.time.Clock()
screenfont = pygame.font.SysFont(None, 20)
playerImage = pygame.image.load("guy.png")
playerImage = pygame.transform.scale(playerImage, (50, 50))
enemyImage = pygame.image.load("bat.png")
enemyImage = pygame.transform.scale(enemyImage, (50, 50))


class Object:
    def __init__(self, midbottom):
        self.rect = pygame.Rect(0, 0, 50, 50)
        self.rect.midbottom = midbottom
        self.u = 0
        self.t = 0
        self.g = 2
        self.hu = 0

    def jump(self, u=-70, hu=0):
        if self.rect.bottom + self.u < screen.get_rect().bottom:
            return
        self.u = u
        self.hu = hu
        self.t = 0
        self.move()

    def move(self):
        self.u = self.u + self.g * self.t
        self.t += 1

    def update(self):
        if self.rect.bottom + self.u >= screen.get_rect().bottom:
            self.u = 0
            self.hu = 0
            self.rect.bottom = screen.get_rect().bottom
        else:
            self.move()
        self.rect.move_ip(self.hu, self.u)


score = 0
game_over = True

hs_file = open("hs.txt", "r")
hs = int(hs_file.read())
hs_file.close()
x, y = screen.get_rect().midbottom
obj = Object((x - 100, y))
enemy = pygame.Rect(0, 0, 50, 50)
enemy.center = (screen.get_rect().right, screen.get_rect().height / 2)

while True:
    clock.tick(20)
    screen.fill((0, 255, 0))

    if game_over:
        scoreText = screenfont.render(
            "High-Score: " + str(hs) + " ... Press Space to Continue", True, (0, 0, 0)
        )
        scoreRect = scoreText.get_rect()
        scoreRect.center = screen.get_rect().center
        screen.blit(scoreText, scoreRect)
    else:
        scoreText = screenfont.render("Score: " + str(score), True, (0, 0, 0))
        scoreRect = scoreText.get_rect()
        scoreRect.topleft = screen.get_rect().topleft
        screen.blit(scoreText, scoreRect)
        obj.update()
        screen.blit(playerImage, obj.rect)
        enemy.move_ip(-20, 0)
        if enemy.left <= 0:
            score += 1
            enemy.center = (
                screen.get_rect().right,
                random.randrange(40, screen.get_rect().height - 40),
            )
        screen.blit(enemyImage, enemy)
        if obj.rect.colliderect(enemy):
            # High Score
            if hs < score:
                hs = score
                hs_file = open("hs.txt", "w")
                hs_file.write(str(score))
                hs_file.close()
            game_over = True

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                if game_over:
                    score = 0
                    game_over = False
                    obj.rect.bottom = y
                    enemy.center = (
                        screen.get_rect().right,
                        screen.get_rect().height / 2,
                    )
                else:
                    obj.jump()

    pygame.display.flip()
