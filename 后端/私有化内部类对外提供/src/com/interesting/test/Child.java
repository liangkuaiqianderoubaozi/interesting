package com.interesting.test;


public class Child {

    private static Child child = null;

    private Utils d = null;

    Child() {
        d = new Utils();
    }

    public static Child getChild() {
        if (child == null) {
            child = new Child();
        }

        return child;
    }

    public Utils getUtils() {
        return child.d;
    }


    private class Utils extends Parent {

    }

}
