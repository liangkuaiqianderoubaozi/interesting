package com.interesting.build.packing.impl;

import com.interesting.build.packing.Packing;

public class Wrapper implements Packing {
    @Override
    public String pack() {
        return "wrapper";
    }
}
