import { RecipeDtoType } from '@dishcover/shared/types/resources/Recipe'
import {
  useContainerPosition,
  useMasonry,
  usePositioner,
  useResizeObserver,
  useScroller} from 'masonic'
import { useRef } from 'react'
import { useWindowSize } from 'usehooks-ts'

import RecipeCard from '../molecules/RecipeCard'

interface RecipeCardListProps {
  recipes?: RecipeDtoType[]
  cardActionCallbacks?: {
    onClickDelete: (recipe: RecipeDtoType) => void
    onClickEdit: (recipe: RecipeDtoType) => void
  }
}
export default function RecipeCardList({ recipes = [], cardActionCallbacks }: RecipeCardListProps) {
  const containerRef = useRef(null)
  const { height, width: windowWidth } = useWindowSize()
  const { offset, width } = useContainerPosition(containerRef, [windowWidth, height])
  const { scrollTop, isScrolling } = useScroller(offset)

  const positioner = usePositioner({ width, columnWidth: 350, columnGutter: 8, rowGutter: 8 }, [
    recipes
  ])
  const resizeObserver = useResizeObserver(positioner)

  return useMasonry({
    positioner,
    scrollTop,
    resizeObserver,
    items: recipes.map((r) => ({ recipe: r, cardActionCallbacks })),
    isScrolling,
    height,
    containerRef,
    render: RecipeCard,
    overscanBy: 10
  })
}
