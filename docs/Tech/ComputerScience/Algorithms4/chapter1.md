# 第1章-基础
## 1.1基础编程模型
本章内容较为简单，关于章节内容不做笔记记录了，只做一下练习题。

**1.1.1** 给出以下表达式的值：
```java
a. ( 0 + 15 ) / 2
b. 2.0e-6 * 100000000.1
c. true && false || true && true
```
> a. int类型 值为 7
> b. 科学计数法，默认类型为 double 类型，值为 200.0000002
> c. boolean类型，值为 true


**1.1.2** 给出以下表达式的类型和值：
```java
a. (1 + 2.236)/2
b. 1 + 2 + 3 + 4.0
c. 4.1 >= 4
d. 1 + 2 + "3"
```
> a. double 类型，java 浮点数默认类型为 double，值为1.618
> b. double 类型，值为 10.0
> c. boolean 类型，值为 true
> d. String 类型，值为 “33”


**1.1.3** 编写一个程序，从命令行得到三个整数参数。如果它们都相等则打印 equal，否则打印 not 
equal。
```java
public class Pratice1_1_3 {
  public static void main(String[] args) {
    int readCnt = 0;
    int[] input = new int[3];
    while (readCnt < 3) {
      input[readCnt] = StdIn.readInt();
      readCnt++;
    }
    boolean equal = true;
    for (int i = 1; i < 3; i++) {
      if (input[i] != input[i - 1]) {
        equal = false;
        break;
      }
    }
    if (equal) {
      System.out.println("equal");
    } else {
      System.out.println("not equal");
    }
  }
}
```

**1.1.4** 下列语句各有什么问题（如果有的话）？
```java
a. if (a > b) then c = 0;
b. if a > b { c = 0; }
c. if (a > b) c = 0;
d. if (a > b) c = 0 else b = 0;
```
> a. java 没有 then 关键字。
> b. if 条件需要括号包裹。
> c. 没有问题。
> d. c = 0 后面少了分号。

**1.1.5** 编写一段程序，如果 double 类型的变量 x 和 y 都严格位于 0 和 1 之间则打印 true，否则打印false。
```java
public class Pratice1_1_5 {
  public static void main(String[] args) {
    double x = Double.parseDouble(args[0]);
    double y = Double.parseDouble(args[1]);
    if ((0 <= x && x <= 1.0) && (0 <= y && y <= 1.0)) {
      System.out.println("true");
      return;
    }
    System.out.println("false");
  }
}
```
但是这么比较可能还是会丢精度。


**1.1.6** 下面这段程序会打印什么？
```java
int f = 0;
int g = 1;
for (int i = 0; i <= 15; i++) {
  StdOut.println(f);
  f = f + g;
  g = f - g;
}
```
> 0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610


**1.1.7** 分别给出以下代码段打印出的值：
```java
a. double t = 9.0;
 while (Math.abs(t - 9.0/t) > .001)
 t = (9.0/t + t) / 2.0;
 StdOut.printf("%.5f\n", t);
b. 
int sum = 0;
for (int i = 1; i < 1000; i++)
   for (int j = 0; j < i; j++)
     sum++;
StdOut.println(sum);
c. 
int sum = 0;
  for (int i = 1; i < 1000; i *= 2)
    for (int j = 0; j < 1000; j++)
      sum++;
StdOut.println(sum);
```
> a. 3.00009
> b. 499500
> c. 10000


**1.1.8** 下列语句会打印出什么结果？给出解释。
```java
a. System.out.println('b');
b. System.out.println('b' + 'c');
c. System.out.println((char) ('a' + 4));
```
> b
> bc
> e


**1.1.9** 编写一段代码，将一个正整数 N 用二进制表示并转换为一个 String 类型的值 s。
```java

```