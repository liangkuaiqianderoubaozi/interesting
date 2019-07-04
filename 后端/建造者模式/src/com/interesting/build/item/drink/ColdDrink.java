package com.interesting.build.item.drink;

import com.interesting.test.Item;
import com.interesting.build.packing.Packing;
import com.interesting.build.packing.impl.Bottle;

public abstract class ColdDrink implements Item {

    @Override
    public Packing packing() {
        return new Bottle();
    }

    @Override
    public abstract float price();
}