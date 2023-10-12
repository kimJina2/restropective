<%--리팩토링 전--%>
<div class="pagination">
    <div class="btn">
        <%
            String navPgLink = "/sub/xxx.jsp?PgCode=";
            String lastPgLink = "/sub/ooo.jsp";
            String prevPgLink = navPgLink;
            String nextPgLink = navPgLink;
            String prevPgTxt = "PREV";
            String nextPgTxt = "NEXT";
            String lastPgTxt = "LAST";

            File dirchk = new File(pgNationPath);
            File [] dirchknum = dirchk.listFiles();

            int totalPgNum = dirchknum.length;
            int portfolioPgNumCode = Integer.parseInt(PortfolioPgNum);

            if(portfolioPgNumCode <=  1){
                prevPgLink = "#First" + prevPgLink;
                prevPgTxt = "END";
                nextPgLink = nextPgLink + (portfolioPgNumCode + 1);

            }else if(portfolioPgNumCode > 1 && portfolioPgNumCode < totalPgNum){

                if(portfolioPgNumCode == 70){
                    prevPgLink = prevPgLink + (portfolioPgNumCode -1);
                    nextPgLink = nextPgLink + "77";
                }else if(portfolioPgNumCode == 77){
                    prevPgLink = prevPgLink + "70";
                    nextPgLink = nextPgLink + "80";
                }else if(portfolioPgNumCode == 80){
                    prevPgLink = prevPgLink + "77";
                    nextPgLink = lastPgLink;
                    nextPgTxt = "END";
                }else{
                    prevPgLink = prevPgLink + (portfolioPgNumCode -1);
                    nextPgLink = nextPgLink + (portfolioPgNumCode + 1);
                }

            }else if(portfolioPgNumCode >= totalPgNum){
                prevPgLink = prevPgLink + (portfolioPgNumCode -1);
                nextPgLink = "#Last" + nextPgLink;
                nextPgTxt = "END";
            }
        %>
        <a href="<%=prevPgLink %>" class="prev"><span><%=prevPgTxt %></span></a>
        <a href="<%=nextPgLink %>" class="next"><span><%=nextPgTxt %></span></a>
        <!-- <a href="/sub/experience.jsp" class="next"><span>LIST</span></a> -->
    </div>
</div>

<%--리팩토링 후--%>

<!-- prev / next -->
<div class="pagination">
    <div class="btn" id="paging">
    </div>
</div>
<!--// prev / next -->
<%
    String workImg = "";
    for(int i=0; i<workList.length; i++) {
        if(workList[i][3] == "y") {
            if( "1" == workList[i][0]) {
                workImg = workList[i][0];
            } else {
                workImg += "," + workList[i][0];
            }
        }
    }
%>
<script>
    var workImgList = "<%=workImg%>".split(",");
    var pgCode = "<%=PortfolioPgNum%>";
    var prevCode = "",
        nextCode = "",
        div = "";
    for(var i=0; i<workImgList.length; i++) {
        if(workImgList[i] == pgCode) {
            prevCode = workImgList[i-1];
            nextCode = workImgList[i+1];

            if(prevCode != undefined) {
                div += '<a href="/sub/portfolio.jsp?PgCode='+prevCode+'" class="prev"><span>PREV</span></a>';
            } else {
                div += '<a href="/sub/experience.jsp" class="prev"><span>LIST</span></a>';
            }

            if(nextCode != undefined) {
                div += '<a href="/sub/portfolio.jsp?PgCode='+nextCode+'" class="next"><span>NEXT</span></a>';
            } else {
                div += '<a href="/sub/experience.jsp" class="next"><span>LIST</span></a>';
            }
        }
    }
    document.getElementById('paging').innerHTML = div;
</script>