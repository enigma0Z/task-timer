import { render } from "@testing-library/react"
import React from "react"
import { FlexModal } from "./FlexModal"

test('render', () => {
    render(<FlexModal
        open={true}
        onClose={() => { }}
    />)
})
