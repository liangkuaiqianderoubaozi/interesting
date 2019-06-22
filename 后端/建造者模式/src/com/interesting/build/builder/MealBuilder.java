package com.interesting.build.builder;

import com.interesting.build.item.drink.impl.Coke;
import com.interesting.build.item.drink.impl.Pepsi;
import com.interesting.build.item.food.impl.ChickenBurger;
import com.interesting.build.item.food.impl.VegBurger;

public class MealBuilder {

    public Meal prepareVegMeal (){
        Meal meal = new Meal();
        meal.addItem(new VegBurger());
        meal.addItem(new Coke());
        return meal;
    }

    public Meal prepareNonVegMeal (){
        Meal meal = new Meal();
        meal.addItem(new ChickenBurger());
        meal.addItem(new Pepsi());
        return meal;
    }
}
