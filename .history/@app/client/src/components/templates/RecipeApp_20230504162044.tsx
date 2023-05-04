import { RecipeDtoType } from '@dishcover/shared'
import RecipeSearchField from '../atoms/recipe/RecipeSearchField'
import RecipeCardList from '../organisms/RecipeCardList'
import { useState } from 'react'

interface RecipeAppProps {
  recipes: Array<RecipeDtoType>
}
export default function RecipeApp({ recipes }: RecipeAppProps) {
  const [list, setList] = useState<string[]>([]) // The list of items to search
  const [searchQuery, setSearchQuery] = useState<string>('') // The search query
  const [searchResults, setSearchResults] = useState<string[]>([]) // The search results
  const debouncedSearchQuery = useDebounce(searchQuery, 500) // Debounce the search query by 500ms

  useEffect(() => {
    const fuse = new Fuse(list, {
      keys: ['name', 'description']
    })

    const results = fuse.search(debouncedSearchQuery).map((result) => result.item)
    setSearchResults(results)
  }, [list, debouncedSearchQuery])
  return (
    <>
      <RecipeSearchField />
      <RecipeCardList recipes={recipes} />
    </>
  )
}
