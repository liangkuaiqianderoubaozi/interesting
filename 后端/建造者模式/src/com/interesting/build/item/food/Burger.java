package com.interesting.build.item.food;

import com.interesting.test.Item;
import com.interesting.build.packing.Packing;
import com.interesting.test.Wrapper;

public abstract class Burger implements Item {
    @Override
    public Packing packing() {
        return new Wrapper();
    }

    @Override
    public abstract float price();
}
