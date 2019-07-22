package com.interesting.light.game;

/**
 * 运动员
 *
 * @author Administrator
 */
public class SportMan {

    /**
     * 编号
     */
    private int num;

    private SportMan nextSportMan;

    public SportMan(int num) {
        this.num = num;
    }

    public void run() {
        System.out.println(this.num + "号队员开始跑了");
        over();
    }

    public void over() {
        System.out.println(this.num + "号队员开始跑完");
        pickUp();
    }

    public void setPickUp(SportMan nextSportMan) {
        this.nextSportMan = nextSportMan;
    }

    public void pickUp() {
        if (nextSportMan != null) {
            System.out.println(this.num + "号队员将接力棒交接给" + nextSportMan.num + "号队员了");
        }
    }
}
