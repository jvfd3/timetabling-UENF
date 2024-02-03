# Default Styles

## Explanation

- background is where everything is located, so it's the first thing to be set. Inside it are two divs: CRUD-page-selection and CRUDContainComponents.
- CRUD-page-selection is the div that contains the buttons for the CRUD pages. It's aligned to the left and top of the screen.
- CRUDContainComponents is the div that contains the components for the CRUD pages. It's aligned to the bottom-center of the screen. It contains a top select with itemSelectionBar and a div with infoCard.
- itemSelectionBar is the div that contains the select for the items.
- infoCard is the div that contains all the information about the selected item.
- showBasicDataCard is the div that contains the basic information about the selected items.
- showBasicDataTable is the table that contains the information about the selected item.
- whiteColor and blackColor are classes that change the color of the text.

## My CSS Structure

- background
  - CRUD-page-selection
    - PageSelection
    - PageSelectionSelect
  - CRUDContainComponents
    - SelectionBar
      - SelectList
    - infoCard
      - showBasicDataCard
        - showBasicDataTable
