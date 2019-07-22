package com.interesting.light.game;

import java.util.List;

/**
 * 跑道
 *
 * @author Administrator
 */
public class Playground {

    private Referee referee;

    /**
     * 添加裁判
     *
     * @param referee 裁判
     */
    public void addReferee(Referee referee) {
        this.referee = referee;
    }


    /**
     * 开始比赛
     */
    public void startGame(int tractNum) {

        if (referee == null) {
            System.out.println("请指定裁判");
            return;
        }
        referee.action(tractNum);
    }


}
