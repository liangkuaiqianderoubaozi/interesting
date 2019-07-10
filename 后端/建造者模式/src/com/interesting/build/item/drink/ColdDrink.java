package com.interesting.build.item.drink;

import com.interesting.build.Item;
import com.interesting.build.packing.Packing;

public abstract class ColdDrink implements Item {

    @Override
    public Packing packing() {
        return null;
    }

    @Override
    public abstract float price();
}