import { RecipeDtoType } from '@dishcover/shared'
import RecipeSearchField from '../atoms/recipe/RecipeSearchField'
import RecipeCardList from '../organisms/RecipeCardList'
import { useState, useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'
import Fuse from 'fuse.js'

interface RecipeAppProps {
  recipes: Array<RecipeDtoType>
}
export default function RecipeApp({ recipes }: RecipeAppProps) {
  const [list, setList] = useState<Array<RecipeDtoType>>([]) // The list of items to search
  const [searchQuery, setSearchQuery] = useState<string>('') // The search query
  const [searchResults, setSearchResults] = useState<string[]>([]) // The search results
  const debouncedSearchQuery = useDebounce(searchQuery, 500) // Debounce the search query by 500ms

  useEffect(() => {
    const addIngredientKeys = recipe?.map
    const fuse = new Fuse(list, {
      keys: ['label', 'ingredients']
    })

    const results = fuse.search(debouncedSearchQuery).map((result) => result.item)
    setSearchResults(results)
  }, [list, debouncedSearchQuery])
  return (
    <>
      <RecipeSearchField value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <RecipeCardList recipes={recipes} />
    </>
  )
}
