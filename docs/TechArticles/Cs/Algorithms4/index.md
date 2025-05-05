《算法4》学习笔记

对应的教材为：[算法4豆瓣](https://book.douban.com/subject/19952400/)
<p><img src="/TechArticles/Cs/Algorithms4/pics/bookcover.webp" width="300"/></p>

对应的：[教材配套官网](https://algs4.cs.princeton.edu/home/)。

可以去官网把教材中用到的 [jar包](https://algs4.cs.princeton.edu/code/algs4.jar) 下载到本地，然后导入到 IDEA 中，方便学习。

使用方式：[参考官网](https://algs4.cs.princeton.edu/code/)
> IntelliJ (manual). Download algs4.jar to a folder and add algs4.jar to the project via File → Project Structure → Libraries → New Project Library.

测试：
```java
public class HelloWorld {
  public static void main(String[] args) {
    int N = 100;
    StdDraw.setXscale(0, N); //StdDraw就是algs4中的类
    StdDraw.setYscale(0, N*N);
    StdDraw.setPenRadius(.01);
    for(int i = 1; i <= N; ++i) {
      StdDraw.point(i, i);
      StdDraw.point(i, i*i);
      StdDraw.point(i, i*Math.log(i));
    }
  }
}
```
结果：
<p><img src="/TechArticles/Cs/Algorithms4/pics/test_index.png" width="400"/></p>
