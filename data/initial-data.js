export default {
    "Inventory_Specification": [
        {
            "name": "burger",
            "type": "mass"
        },
        {
            "name": "6oz-burger-bun",
            "type": "mass"
        },
        {
            "name": "3oz-burger-bun",
            "type": "mass"
        },
        {
            "name": "lettuce",
            "type": "mass"
        },
        {
            "name": "tomato",
            "type": "mass"
        },
        {
            "name": "pickle",
            "type": "mass"
        },
        {
            "name": "onion",
            "type": "mass"
        },
        {
            "name": "ranch-mix",
            "type": "mass"
        },
        {
            "name": "sourcream",
            "type": "mass"
        },
        {
            "name": "ancho-chili-peppers",
            "type": "mass"
        },
        {
            "name": "ancho-chili-puree",
            "type": "mass"
        },
        {
            "name": "mayonaise",
            "type": "mass"
        },
        {
            "name": "butter-milk",
            "type": "mass"
        },
        {
            "name": "dressing-seasoning",
            "type": "mass"
        },
        {
            "name": "ranch",
            "type": "mass"
        },
        {
            "name": "french-fries",
            "type": "mass"
        },
        {
            "name": "nagasaki-tots",
            "type": "mass"
        }
    ],
    "Recipes_Specification": [
        {
            "name": "ranch-ranch-mix",
            "ingredients": {
                "type": "list",
                "items": [
                    {
                        "name": "ranch-mix",
                        "amount": 1,
                        "unit": "oz"
                    },
                    {
                        "name": "mayonaise",
                        "amount": 1,
                        "unit": "oz"
                    },
                    {
                        "name": "butter-milk",
                        "amount": 1,
                        "unit": "oz"
                    }
                ]
            }
        },
        {
            "name": "ranch-home-made",
            "ingredients": {
                "type": "list",
                "items": [
                    {
                        "name": "dressing-seasoning",
                        "amount": 1,
                        "unit": "oz"
                    },
                    {
                        "name": "mayonaise",
                        "amount": 1,
                        "unit": "oz"
                    },
                    {
                        "name": "sour-cream",
                        "amount": 1,
                        "unit": "oz"
                    },
                    {
                        "name": "butter-milk",
                        "amount": 1,
                        "unit": "oz"
                    }
                ]
            }
        },
        {
            "name": "ranch",
            "ingredients": {
                "type": "alternative",
                "items": [
                    {
                        "name": "ranch-ranch-mix",
                        "amount": 1,
                        "unit": "oz"
                    },
                    {
                        "name": "ranch-home-made",
                        "amount": 1,
                        "unit": "oz"
                    }
                ]
            }
        },
        {
            "name": "ancho-chili-paste",
            "ingredients": {
                "type": "alternative",
                "items": [
                    {
                        "name": "ancho-chili-peppers",
                        "amount": 1,
                        "unit": "oz"
                    },
                    {
                        "name": "ancho-chili-puree",
                        "amount": 1,
                        "unit": "oz"
                    }
                ]
            }
        },
        {
            "name": "ancho-ranch",
            "ingredients": {
                "type": "list",
                "items": [
                    {
                        "name": "ranch",
                        "amount": 18,
                        "unit": "oz"
                    },
                    {
                        "name": "ancho-chili-paste",
                        "amount": 3,
                        "unit": "oz"
                    }
                ]
            }
        },
        {
            "name": "garden salad",
            "ingredients": {
                "type": "list",
                "items": [
                    {
                        "name": "lettuce",
                        "amount": 9,
                        "unit": "g"
                    },
                    {
                        "name": "tomato",
                        "amount": 30,
                        "unit": "g"
                    },
                    {
                        "name": "onion",
                        "amount": 15,
                        "unit": "g"
                    },
                    {
                        "name": "ranch",
                        "amount": 2,
                        "unit": "oz"
                    }
                ]
            }
        },
        {
            "name": "LTOP",
            "ingredients": {
                "type": "list",
                "items": [
                    {
                        "name": "lettuce",
                        "amount": 28,
                        "unit": "g"
                    },
                    {
                        "name": "tomato",
                        "amount": 30,
                        "unit": "g"
                    },
                    {
                        "name": "onion",
                        "amount": 15,
                        "unit": "g"
                    },
                    {
                        "name": "pickle",
                        "amount": 12,
                        "unit": "g"
                    }
                ]
            }
        },
        {
            "name": "Fat Man Burger",
            "ingredients": {
                "type": "list",
                "items": [
                    {
                        "name": "burger",
                        "amount": 6,
                        "unit": "oz"
                    },
                    {
                        "name": "LTOP",
                        "amount": 3,
                        "unit": "oz"
                    },
                    {
                        "name": "6oz-burger-bun",
                        "amount": 6,
                        "unit": "oz"
                    },
                    {
                        "name": "mayonaise",
                        "amount": 2,
                        "unit": "oz"
                    }
                ]
            }
        },
        {
            "name": "Little Boy Sliders",
            "ingredients": {
                "type": "list",
                "items": [
                    {
                        "name": "burger",
                        "amount": 9,
                        "unit": "oz"
                    },
                    {
                        "name": "LTOP",
                        "amount": 4,
                        "unit": "oz"
                    },
                    {
                        "name": "3oz-burger-bun",
                        "amount": 9,
                        "unit": "oz"
                    },
                    {
                        "name": "ancho-ranch",
                        "amount": 2,
                        "unit": "oz"
                    }
                ]
            }
        },
        {
            "name": "burger",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "6oz-burger-bun",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "3oz-burger-bun",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "lettuce",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "tomato",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "pickle",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "onion",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "ranch-mix",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "sourcream",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "ancho-chili-peppers",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "ancho-chili-puree",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "mayonaise",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "butter-milk",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "dressing-seasoning",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "ranch",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "french-fries",
            "ingredients": {
                "type": "list",
                "items": []
            }
        },
        {
            "name": "nagasaki-tots",
            "ingredients": {
                "type": "list",
                "items": []
            }
        }
    ],
    "Products_Specification": [
        {
            "name": "Fat Man & Little Boy Platter",
            "items": [
                {
                    "name": "Burger 1",
                    "required": true,
                    "choices": [
                        {
                            "name": "Fat Man Burger"
                        }
                    ]
                },
                {
                    "name": "Burger 2",
                    "required": true,
                    "choices": [
                        {
                            "name": "Little Boy Sliders"
                        },
                        {
                            "name": "Fat Man Burger"
                        }
                    ]
                },
                {
                    "name": "Sides",
                    "required": false,
                    "choices": [
                        {
                            "name": "french-fries"
                        },
                        {
                            "name": "nagasaki-tots"
                        },
                        {
                            "name": "garden salad"
                        }
                    ]
                }
            ]
        }
    ],
    "Sales_Data": [
        {
            "Name": "Fat Man & Little Boy Platter",
            "Amount": 31,
            "Price": 33,
            "Date": "2025-01-02",
            "Choices": "Fat Man Burger",
            "ChoiceAmount": 9,
            "Upcharge": 0
        },
        {
            "Name": null,
            "Amount": null,
            "Price": null,
            "Date": null,
            "Choices": "Little Boy Sliders",
            "ChoiceAmount": 22,
            "Upcharge": 0
        },
        {
            "Name": null,
            "Amount": null,
            "Price": null,
            "Date": null,
            "Choices": "french-fries",
            "ChoiceAmount": 8,
            "Upcharge": 0
        },
        {
            "Name": null,
            "Amount": null,
            "Price": null,
            "Date": null,
            "Choices": "nagasaki-tots",
            "ChoiceAmount": 20,
            "Upcharge": 1.99
        },
        {
            "Name": null,
            "Amount": null,
            "Price": null,
            "Date": null,
            "Choices": "garden salad",
            "ChoiceAmount": 3,
            "Upcharge": 2.99
        },
        {
            "Name": "Fat Man & Little Boy Platter",
            "Amount": 22,
            "Price": 33,
            "Date": "2025-01-03",
            "Choices": "Fat Man Burger",
            "ChoiceAmount": 4,
            "Upcharge": 0
        },
        {
            "Name": null,
            "Amount": null,
            "Price": null,
            "Date": null,
            "Choices": "Little Boy Sliders",
            "ChoiceAmount": 18,
            "Upcharge": 0
        },
        {
            "Name": null,
            "Amount": null,
            "Price": null,
            "Date": null,
            "Choices": "french-fries",
            "ChoiceAmount": 10,
            "Upcharge": 0
        },
        {
            "Name": null,
            "Amount": null,
            "Price": null,
            "Date": null,
            "Choices": "nagasaki-tots",
            "ChoiceAmount": 11,
            "Upcharge": 1.99
        },
        {
            "Name": null,
            "Amount": null,
            "Price": null,
            "Date": null,
            "Choices": "garden salad",
            "ChoiceAmount": 1,
            "Upcharge": 2.99
        }
    ],
    "Inventory_Data": [
        {
            "Name": "burger",
            "Price": 1.99,
            "Amount": 33,
            "Unit": "lb",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "burger",
            "Price": 1.99,
            "Amount": 11,
            "Unit": "lb",
            "Date": "2025-01-04T00:00:00.000Z"
        },
        {
            "Name": "6oz-burger-bun",
            "Price": 0,
            "Amount": 54,
            "Unit": "oz",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "3oz-burger-bun",
            "Price": 0,
            "Amount": 198,
            "Unit": "oz",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "lettuce",
            "Price": 0,
            "Amount": 1100,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "tomato",
            "Price": 0,
            "Amount": 1250,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "pickle",
            "Price": 0,
            "Amount": 470,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "onion",
            "Price": 0,
            "Amount": 630,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "ranch-mix",
            "Price": 0,
            "Amount": 0,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "sourcream",
            "Price": 0,
            "Amount": 0,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "ancho-chili-peppers",
            "Price": 1.99,
            "Amount": 1200,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "ancho-chili-puree",
            "Price": 0,
            "Amount": 0,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "mayonaise",
            "Price": 0,
            "Amount": 510.2928,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "butter-milk",
            "Price": 0,
            "Amount": 0,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "dressing-seasoning",
            "Price": 0,
            "Amount": 0,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "ranch",
            "Price": 0,
            "Amount": 1069.1849142857143,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "french-fries",
            "Price": 0,
            "Amount": 8,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        },
        {
            "Name": "nagasaki-tots",
            "Price": 0,
            "Amount": 20,
            "Unit": "g",
            "Date": "2025-01-01T00:00:00.000Z"
        }
    ]
}