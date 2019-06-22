package com.interesting.build;

import com.interesting.build.packing.Packing;

public interface Item {
    public String name();
    public Packing packing();
    public float price();
}
