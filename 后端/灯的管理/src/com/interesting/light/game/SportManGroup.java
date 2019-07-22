package com.interesting.light.game;


import java.util.LinkedList;

/**
 * @author Administrator
 */
public class SportManGroup {

    LinkedList<SportMan> sportManOrder = new LinkedList<SportMan>();


    public void run() {

        //排好位置
        int size = sportManOrder.size();
        for (int i = 0; i < size; i++) {
            if (size > i + 1) {
                sportManOrder.get(i).setPickUp(sportManOrder.get(i + 1));
            }
        }

        for (SportMan sportMan : sportManOrder) {
            sportMan.run();
        }
    }


    public void setSportManOrder(SportMan sportMan) {
        sportManOrder.add(sportMan);
    }
}
