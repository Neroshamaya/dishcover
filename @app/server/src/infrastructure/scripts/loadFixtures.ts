import { PrismaClient, User } from '@prisma/client'

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const load = async () => {
  const client = new PrismaClient()

  const users = []
  for (let index = 0; index < 3; index++) {
    users.push(
      await client.user.create({
        data: {
          email: `testUserNumber${index}@gmail.com`,
          salt: 'pepper',
          password: 'password'
        }
      })
    )
  }

  const ingredientDb: Array<{ strIngredient: string; strDescription: string }> = (
    await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')).json()
  ).meals as Array<{ strIngredient: string; strDescription: string }>

  for (let index = 0; index < 30; index++) {
    await sleep(1000)
    let user: User
    if (index <= 10) {
      user = users[0]
    } else if (index > 10 && index <= 20) {
      user = users[1]
    } else {
      user = users[2]
    }
    const url = 'http://www.themealdb.com/api/json/v1/1/random.php'
    const response = await fetch(url)
    const apiReponse = (await response.json()) as {
      meals: Array<{ strMealThumb: string; strMeal: string; [otherkeys: string]: string }>
    }

    const meal = apiReponse.meals[0]
    try {
      await client.recipe.create({
        data: {
          image: meal.strMealThumb,
          label: meal.strMeal,
          ingredients: {
            create: Object.keys(meal)
              .filter((e) => e.startsWith('strIngredient') && meal[e]?.length > 0)
              .map((e) => ({
                quantity: 1,
                details: {
                  connectOrCreate: {
                    where: {
                      label: meal[e]
                    },
                    create: {
                      label: meal[e],
                      iconLink: `https://www.themealdb.com/images/ingredients/${meal[e]}.png`,
                      description: ingredientDb.find((i) => i.strIngredient === meal[e])
                        ?.strDescription,
                      authorId: user.id
                    }
                  }
                }
              }))
          },
          description: meal.strInstructions,
          author: {
            connect: {
              id: user?.id
            }
          }
        }
      })
    } catch (error) {
      continue
    }
  }
}

load()
