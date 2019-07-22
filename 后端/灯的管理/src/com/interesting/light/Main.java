package com.interesting.light;


import com.interesting.light.game.Playground;
import com.interesting.light.game.Referee;
import com.interesting.light.game.SportMan;
import com.interesting.light.game.SportManGroup;

import java.util.Arrays;

/**
 * @author Administrator
 */
public class Main {


    public static void main(String[] args) {

        //创建操场
        Playground playground = new Playground();


        //设置裁判
        Referee referee = new Referee();

        //安排跑道分组
        SportManGroup sportManGroup = new SportManGroup();

        //安排运动员跑步
        SportMan zhangsan = new SportMan(1);
        SportMan lisi = new SportMan(2);
        SportMan wangwu = new SportMan(3);
        SportMan maliu = new SportMan(4);
        SportMan yangqi = new SportMan(5);

        sportManGroup.setSportManOrder(zhangsan);
        sportManGroup.setSportManOrder(lisi);
        sportManGroup.setSportManOrder(wangwu);
        sportManGroup.setSportManOrder(maliu);
        sportManGroup.setSportManOrder(yangqi);

        referee.addSportGroup(Arrays.asList(sportManGroup), 1);

        playground.addReferee(referee);


        playground.startGame(1);

        String s = "AMERICAN EXPRESS,DISCOVER,JCB,MAESTRO,MASTERCARD,VISA";

    }
}
