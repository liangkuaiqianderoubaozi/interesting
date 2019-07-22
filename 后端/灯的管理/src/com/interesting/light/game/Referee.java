package com.interesting.light.game;


import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 裁判
 *
 * @author Administrator
 */
public class Referee {

    private LinkedHashMap<Integer, List<SportManGroup>> schedule = new LinkedHashMap<>();


    /**
     * 开始
     */
    public void action(int trackNum) {
        List<SportManGroup> sportManGroups = schedule.get(trackNum);

        System.out.println("开始比赛");
        for (SportManGroup sportManGroup : sportManGroups) {
            sportManGroup.run();
        }

        System.out.println("比赛结束");
        schedule.remove(trackNum);
    }


    /**
     * 设置要进行比赛的运动员
     *
     * @param sportManGroups 运动员组
     * @param trackNum       跑道编号
     */
    public void addSportGroup(List<SportManGroup> sportManGroups, int trackNum) {
        System.out.println(trackNum + "号跑道队员准备");
        schedule.put(trackNum, sportManGroups);
    }

}
