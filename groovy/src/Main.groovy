/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 15-1-23
 * Time: 上午11:55
 */


s = "Christen\n"

print s.toUpperCase()



//http://www.cnblogs.com/buhaiqing/category/339718.html

def props = new Properties()
new File("foo.properties").withInputStream { s ->
    props.load(s)
}

println props