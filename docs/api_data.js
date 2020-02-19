define({ "api": [
  {
    "type": "get",
    "url": "/cars",
    "title": "Get car list",
    "group": "Cars",
    "name": "Car_list",
    "version": "0.1.0",
    "filename": "src/car/car.controller.ts",
    "groupTitle": "Cars"
  },
  {
    "type": "delete",
    "url": "/cars/:carId",
    "title": "Delete existing car",
    "group": "Cars",
    "name": "Delete_car",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "carId",
            "description": "<p>Car ID</p>"
          }
        ]
      }
    },
    "filename": "src/car/car.controller.ts",
    "groupTitle": "Cars"
  },
  {
    "type": "post",
    "url": "/cars",
    "title": "Create new car",
    "group": "Cars",
    "name": "New_car",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Car name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Car price</p>"
          },
          {
            "group": "Parameter",
            "type": "Manufacturer",
            "optional": true,
            "field": "manufacturer",
            "description": "<p>Car manufacturer</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "firstRegistrationDate",
            "description": "<p>Car registration date</p>"
          },
          {
            "group": "Parameter",
            "type": "Owner[]",
            "optional": true,
            "field": "owners",
            "description": "<p>List of owners</p>"
          }
        ]
      }
    },
    "filename": "src/car/car.controller.ts",
    "groupTitle": "Cars"
  },
  {
    "type": "post",
    "url": "/cars/refresh",
    "title": "Remove old owners and apply discount to old cars",
    "group": "Cars",
    "name": "Refresh_cars",
    "version": "0.1.0",
    "filename": "src/car/car.controller.ts",
    "groupTitle": "Cars"
  },
  {
    "type": "get",
    "url": "/cars/:carId",
    "title": "Get a single car",
    "group": "Cars",
    "name": "Show_car",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Car id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "name",
              "price",
              "manufacturer"
            ],
            "optional": false,
            "field": "select",
            "description": "<p>field to show</p>"
          }
        ]
      }
    },
    "filename": "src/car/car.controller.ts",
    "groupTitle": "Cars"
  },
  {
    "type": "put",
    "url": "/cars/:carId",
    "title": "Update existing car",
    "group": "Cars",
    "name": "Update_car",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Car name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Car price</p>"
          },
          {
            "group": "Parameter",
            "type": "Manufacturer",
            "optional": true,
            "field": "manufacturer",
            "description": "<p>Car manufacturer</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "firstRegistrationDate",
            "description": "<p>Car registration date</p>"
          },
          {
            "group": "Parameter",
            "type": "Owner[]",
            "optional": true,
            "field": "owners",
            "description": "<p>List of owners</p>"
          }
        ]
      }
    },
    "filename": "src/car/car.controller.ts",
    "groupTitle": "Cars"
  }
] });
