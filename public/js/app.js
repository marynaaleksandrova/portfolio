/**
 * License
 *
 *(The MIT License)
 *
 * Copyright (c) 2011 Aleksandrova Maryna <hello@marynaaleksandrova.info>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var App={
    init:function(){
        App.body=$('html,body')
        App.navigation=$('#navigation_menu')
        App.projectsLinks=$('.project_link')
        App.projectPanelHeight=$(window).height()-50
        App.categoriesLinks=$('#work li')

        $('.project_link').click(function(e){
            var selectedProjectLink=$(this),
                projectId=selectedProjectLink.data('projectId'),
                topOffset=e.pageY-52
            selectedProjectLink.addClass('viewed')

            App.projectImage=$('#'+projectId)
            App.projectInfo=$('#'+projectId+'_info')
            App.projectsLinks.hide()
            App.projectImage.show().animate({
                height: App.projectPanelHeight
            }, 1000,
            function(){
                App.navigation.hide()
                App.projectInfo.show()
            })
            App.body.animate({
                scrollTop: topOffset
            },1000)

        })

        $('section.circle_image').click(function(){
            App.closeActiveProjectInfoPanel()
        })

        App.body.keyup(function(e){
            var keyCode = e.keyCode
            //escape
            if(keyCode===27){
                App.closeActiveProjectInfoPanel()
            }
        })

        App.categoriesLinks.click(function(){
            var selectedCategoryLink=$(this),
                category = selectedCategoryLink.data('category')
            App.categoriesLinks.removeClass('active_category')
            selectedCategoryLink.addClass('active_category')

            if('all'===category){
                App.projectsLinks.css('opacity',1)
            }
            else{
                App.projectsLinks.css('opacity',0)
                App.projectsLinks.filter(function(index){
                    return $(this).data('projectCategory')===category
                }).css('opacity',1)
            }
        })
    },
    closeActiveProjectInfoPanel:function(){
        if(App.projectImage){
            App.projectImage.animate({
                height: 0
            },1000,
            function(){
                if(App.projectImage){
                    App.projectImage.hide()
                }else{
                    App.projectImage=null
                }
                if(App.projectInfo){
                    App.projectInfo.hide()
                }
                App.navigation.show()
                App.projectsLinks.show()
            })
        }
    }
}