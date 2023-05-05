import { RecipeDtoType } from '@dishcover/shared'
import RecipeSearchField from '../atoms/recipe/RecipeSearchField'
import RecipeCardList from '../organisms/RecipeCardList'
import { useState, useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'
import Fuse from 'fuse.js'

interface RecipeAppProps {
  recipes: Array<RecipeDtoType>
  cardActionCallbacks?: {
    onClickDelete: (recipe: RecipeDtoType) => void
    onClickEdit: (recipe: RecipeDtoType) => void
  }
}
export default function RecipeApp({ recipes, cardActionCallbacks }: RecipeAppProps) {
  const [searchQuery, setSearchQuery] = useState<string>('') // The search query
  const [searchResults, setSearchResults] = useState<RecipeDtoType[]>([]) // The search results
  const debouncedSearchQuery = useDebounce(searchQuery, 500) // Debounce the search query by 500ms

  useEffect(() => {
    const fuse = new Fuse(recipes, {
      keys: ['label', 'ingredients.label']
    })

    const results = fuse.search(debouncedSearchQuery).map((result) => result.item)
    setSearchResults(results)
  }, [recipes, debouncedSearchQuery])
  return (
    <>
      <RecipeSearchField value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <RecipeCardList cardActionCallbacks={cardActionCallbacks} recipes={searchResults} />
    </>
  )
}
