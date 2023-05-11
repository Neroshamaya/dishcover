import { RecipeDtoType } from '@dishcover/shared/types/resources/Recipe'
import { Box, BoxProps } from '@mui/material'
import Fuse from 'fuse.js'
import { useEffect,useState } from 'react'
import { useDebounce } from 'usehooks-ts'

import RecipeSearchField from '../atoms/recipe/RecipeSearchField'
import RecipeCardList from '../organisms/RecipeCardList'

interface RecipeAppProps extends BoxProps {
  recipes: Array<RecipeDtoType>
  cardActionCallbacks?: {
    onClickDelete: (recipe: RecipeDtoType) => void
    onClickEdit: (recipe: RecipeDtoType) => void
  }
}
export default function RecipeApp({ recipes, cardActionCallbacks, ...otherProps }: RecipeAppProps) {
  const [searchQuery, setSearchQuery] = useState<string>('') // The search query
  const [searchResults, setSearchResults] = useState<RecipeDtoType[]>(recipes) // The search results
  const debouncedSearchQuery = useDebounce(searchQuery, 200) // Debounce the search query by 500ms

  useEffect(() => {
    const fuse = new Fuse(recipes, {
      useExtendedSearch: true,
      keys: [
        { name: 'label', weight: 25 },
        { name: 'recipeIngredients.details.label', weight: 20 },
        'description'
      ]
    })
    if (debouncedSearchQuery.length > 0) {
      const results = fuse.search(`^${debouncedSearchQuery}`).map((result) => result.item)

      setSearchResults(results)
      return
    }
    setSearchResults(recipes)
  }, [recipes, debouncedSearchQuery])

  return (
    <Box
      {...otherProps}
      sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', rowGap: 2 }}>
      <RecipeSearchField value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <RecipeCardList cardActionCallbacks={cardActionCallbacks} recipes={searchResults} />
    </Box>
  )
}
