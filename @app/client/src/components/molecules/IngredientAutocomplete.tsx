import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import { IngredientDtoType } from '@dishcover/shared/types/resources/Ingredient'
import { StandardTextFieldProps } from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import * as React from 'react'

import { state } from '../../store'

interface IngredientAutoCompleteProps extends StandardTextFieldProps {
  openFormDialog: (defaultValues: Partial<CreateIngredientQuery>) => void
  onAddIngredient: (ingredient: IngredientDtoType) => void
}

type IngredientOption = IngredientDtoType | string | { inputValue: string; label: string }

export default function IngredientAutoComplete({
  openFormDialog,
  onAddIngredient,
  ...otherProps
}: IngredientAutoCompleteProps) {
  const [value, setValue] = React.useState<IngredientDtoType | null>(null)
  const [inputValue, setInputValue] = React.useState('')

  const filter = createFilterOptions<IngredientOption>()

  function AddRecipeIngredient(ingredient: IngredientDtoType) {
    onAddIngredient(ingredient)
    setValue(null)
    setInputValue('')
  }

  return (
    <>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          event.preventDefault()
          setInputValue(newInputValue)
        }}
        value={value}
        onChange={(event, newValue) => {
          event.preventDefault()
          if (typeof newValue === 'string') {
            setTimeout(() => {
              openFormDialog({
                label: newValue
              })
            })
          } else if (newValue && 'inputValue' in newValue) {
            openFormDialog({
              label: newValue.inputValue
            })
          } else if (newValue) {
            AddRecipeIngredient(newValue)
          }
        }}
        options={state.ingredients as IngredientOption[]}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          // Add "xxx" option created dynamically
          if ('inputValue' in option) {
            return `Add "${option.inputValue}"`
          }
          // Regular option
          return option.label
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          const { inputValue } = params
          // Suggest the creation of a new value

          const isExisting = filtered.find((option) => {
            return typeof option !== 'string' ? option.label : false
          })
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              label: `Add "${inputValue}"`
            })
          }

          return filtered
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props}>{typeof option !== 'string' ? option.label : option}</li>
        )}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} {...otherProps} label="Search ingredients..." />
        )}
      />
    </>
  )
}
