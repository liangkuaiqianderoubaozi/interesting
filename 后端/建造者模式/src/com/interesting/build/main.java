package com.interesting.build;


import java.util.*;

public class main {


    public static void main(String[] args) {

        int a = 8192  >> 10;
        System.out.println(a);


        ArrayList<Integer> list = new ArrayList<>(3);
        list.add(5);
        list.add(3);
        list.add(8);

        Collections.sort(list);
        System.out.println(list);

        TreeMap<Integer, String> map = new TreeMap<>();
        map.put(8, "3");
        map.put(3, "1222");
        map.put(4, "533");




        System.out.println(map.get(list.get(0)));


    }
}
