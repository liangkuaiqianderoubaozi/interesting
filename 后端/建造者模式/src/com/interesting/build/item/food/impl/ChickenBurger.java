package com.interesting.build.item.food.impl;

import com.interesting.build.item.food.Burger;

public class ChickenBurger extends Burger {
    @Override
    public float price() {
        return 50.5f;
    }

    @Override
    public String name() {
        return "Chicken Burger";
    }
}
