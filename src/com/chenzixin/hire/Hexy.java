package com.chenzixin.hire;

/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 15-3-18
 * Time: 上午11:54
 */

class Hexy {
    public static void main(String[] args) {
        Integer i = 42;
        String s = (i < 40) ? "life" : (i > 50) ? "universe" : "everything";
        System.out.println(s);

        try { int x = Integer.parseInt("one"); }
        catch (IllegalArgumentException e){
            e.printStackTrace();
        }
    }
}
