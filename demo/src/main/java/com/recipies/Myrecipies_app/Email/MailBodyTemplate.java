package com.recipies.Myrecipies_app.Email;

 

public class MailBodyTemplate {

      

      

       public String getForgetPasswordBody(String name,String Url){

             

       return       "<html> <body><h1><table border=\"0\" width=\"100%\" cellpadding=\"0\" bgcolor=\"#efefef\" align=\"center\"  ><tbody><tr><td>"

                    + "<center><br>"

                    + "<table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"10\" style=\"border:1px solid #cccccc;background-color:#05c85f\"><tbody>"

                    + "<tr><td align=\"center\"><table border=\"0\" width=\"100%\" cellpadding=\"5\" bgcolor=\"#ffffff\" align=\"center\">"

                    + "<tbody><tr><td align=\"center\" bgcolor=\"#FFFFFFF\"><br>"

                    + "<table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr>"

                    + "<td valign=\"top\" align=\"center\"><img src =\"http://localhost:3000/images/Myrecipe.png\" alt=\"myrecipe\"></img></td></tr></tbody><table/>"

                    + "<table border=\"0\" width=\"90%\" cellpadding=\"5\" cellspacing=\"0\"><tbody><tr><td><table border=\"0\" width=\"100%\" bgcolor=\"#FEFEFE\" align=\"center\" cellpadding=\"0\"><tbody><tr><td align=\"center\" bgcolor=\"#ffffff\">"

                    + "<font face=\"arial\" style=\"font-size:15px,color:#444444\">"

                    + "<div align=\"center\"><center><font style=\"font-size:26px\">"+name+",Reset your Password</font></center>"

                    + "<br><br><b>Uh oh,Seems like you have Forgotten your Password.so have we</b><br><br>You can Click on the Magical button below to reset your password <br><br><br><center>"

                    + "<a style= \"-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;border-radius: 4px;border: solid 1px #20538D;text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);background: #f53838;color:#ffffff;padding: 8px 12px;text-decoration: none;\" href="+Url+">Reset Password</a>"

                    + "</center></div></font></td></tr></tbody></table></td></tr></tbody></table><br></td></tr></tbody></table></td></tr></tbody></table><center/>"

                    + "</tr></tbody></table> </body></html>";

       }

 

      

      

       public String getRegisterBody(String name,String Url){

             

       return       "<html> <body><table border=\"0\" width=\"100%\" cellpadding=\"0\" bgcolor=\"#efefef\" align=\"center\"  ><tbody><tr><td>"

                     +"<center><br><table border=\"0\" width=\"700\" cellpadding=\"0\" cellspacing=\"0\" style=\"border:1px solid #cccccc;background-color:#05c85f\">"

                     + "<tbody><tr><td align=\"left\"><table border=\"0\" width=\"100%\" cellpadding=\"5\" bgcolor=\"#ffffff\" align=\"center\"><tbody>"

                     + "<tr><td align=\"center\" bgcolor=\"#FFFFFF\"><br><table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>"

                     + "<tr><td valign=\"top\" align=\"center\"><img src=\"https://localhost:3000/images/Myrecipe.png\"><img/></td></tr></tbody>"

                     + "</table><table border=\"0\" width=\"90%\" cellpadding=\"5\" cellspacing=\"0\"><tbody>"

                     + "<tr><td><table border=\"0\" width=\100%\" bgcolor=\"#FEFEFE\" align=\"center\" cellpadding=\"0\"><tbody>"

                     + "<tr><td align=\"justify\" bgcolor=\"#ffffff\"><font face=\"arial\" style=\"font-size:15px;color:#444444\">"

                     + "<div align=\"justify\"><center><table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td width=\"50%\"><img src=\"https://localhost:3000/sample_img.png\"></img></td><td><font style=\"font-size:26px:color:#444444\">"+name+"</font><br><br><span>Let us delight you with  delicious meals</span><br><br><span>You can share and learn to cook from the food lovers outh there !!!!</span></td></tr></tbody></table>"

                     + "<br><br><table bgcolor=\"#f0f0f0\" border=\"0\" width=\"100%\" cellpadding=\"15\" cellspacing=\"0\" style=\"border-radius:10px\">"

                     + "<tbody><tr><td align=\"center\"><font color=\"#444444\"><b>Please verify your account to shart using My recipies</b></font><br><br>"

                     + "<a style= \"-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;border-radius: 4px;border: solid 1px #20538D;text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);background: #f53838;color:#ffffff;padding: 8px 12px;text-decoration: none;\" href="+Url+">Verify Account</a></td></tr></tbody></table></center></div>"

                     + "</font></td></tr></tbody>"

                     + "</table></td></tr></tbody></table><br></td></tr></tbody></table></td></tr></tbody></table></center>"

                     +"</td></tr></tbody></table></body></html>";

                    

                   

       }

 

}

