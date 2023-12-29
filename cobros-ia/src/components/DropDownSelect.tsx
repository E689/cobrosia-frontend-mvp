'use client'

import React, { useState } from "react"

export default function DropDownSelector() {

    return (
        <label>
            Select: 
            <select>
                <option>Test 1</option>
                <option>Test 2</option>
                <option>Test 3</option>
            </select>
        </label>
    )
}