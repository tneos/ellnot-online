const express = require("express");
const router = express.Router();

const Clothing = require("../models/Clothing");

// @route   GET api/under-:price
// @desc    Get data based on price
// @access  Public
router.get("/:price", async (req, res) => {
  let price = parseFloat(req.params.price);

  try {
    // Get all clothing data and aggregate the other collections
    const found = await Clothing.aggregate([
      {
        $lookup: {
          from: "shoes_accessories",
          localField: "collectionId",
          foreignField: "collectionId",
          as: "shoes_accessories",
        },
      },
      {
        $unwind: "$shoes_accessories",
      },

      {
        $lookup: {
          from: "summer_collection",
          localField: "collectionId",
          foreignField: "collectionId",
          as: "summer_collection",
        },
      },
      {
        $unwind: "$summer_collection",
      },

      {
        $project: {
          dresses: {
            $filter: {
              input: "$jeans",
              as: "jeans",
              cond: {$lt: ["$$jeans.numericalPrice", price]},
            },
          },
          lingerie: {
            $filter: {
              input: "$lingerie",
              as: "lingerie",
              cond: {$lt: ["$$lingerie.numericalPrice", price]},
            },
          },
          tops: {
            $filter: {
              input: "$tops",
              as: "tops",
              cond: {$lt: ["$$tops.numericalPrice", price]},
            },
          },
          dresses: {
            $filter: {
              input: "$dresses",
              as: "dresses",
              cond: {$lt: ["$$dresses.numericalPrice", price]},
            },
          },
          skirts: {
            $filter: {
              input: "$skirts",
              as: "skirts",
              cond: {$lt: ["$$skirts.numericalPrice", price]},
            },
          },
          shorts: {
            $filter: {
              input: "$shorts",
              as: "shorts",
              cond: {$lt: ["$$shorts.numericalPrice", price]},
            },
          },
          cardigans: {
            $filter: {
              input: "$cardigans",
              as: "cardigans",
              cond: {$lt: ["$$cardigans.numericalPrice", price]},
            },
          },
          sales: {
            $filter: {
              input: "$sales",
              as: "sales",
              cond: {$lt: ["$$sales.numericalPrice", price]},
            },
          },
          summer_collection: {
            summer_items: {
              $filter: {
                input: "$summer_collection.summer_items",
                as: "summer_items",
                cond: {$lt: ["$$summer_items.numericalPrice", price]},
              },
            },
          },
          shoes_accessories: {
            accessories: {
              $filter: {
                input: "$shoes_accessories.accessories",
                as: "accessories",
                cond: {$lt: ["$$accessories.numericalPrice", price]},
              },
            },
            boots: {
              $filter: {
                input: "$shoes_accessories.boots",
                as: "boots",
                cond: {$lt: ["$$boots.numericalPrice", price]},
              },
            },
            heels: {
              $filter: {
                input: "$shoes_accessories.heels",
                as: "heels",
                cond: {$lt: ["$$heels.numericalPrice", price]},
              },
            },
            hats: {
              $filter: {
                input: "$shoes_accessories.hats",
                as: "hats",
                cond: {$lt: ["$$hats.numericalPrice", price]},
              },
            },
            handbags: {
              $filter: {
                input: "$shoes_accessories.handbags",
                as: "handbags",
                cond: {$lt: ["$$handbags.numericalPrice", price]},
              },
            },
            belts: {
              $filter: {
                input: "$shoes_accessories.belts",
                as: "belts",
                cond: {$lt: ["$$belts.numericalPrice", price]},
              },
            },
            candles: {
              $filter: {
                input: "$shoes_accessories.candles",
                as: "candles",
                cond: {$lt: ["$$candles.numericalPrice", price]},
              },
            },
            sunglasses: {
              $filter: {
                input: "$shoes_accessories.sunglasses",
                as: "sunglasses",
                cond: {$lt: ["$$sunglasses.numericalPrice", price]},
              },
            },
          },
        },
      },
    ]);

    res.json({
      status: "success",
      found,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
