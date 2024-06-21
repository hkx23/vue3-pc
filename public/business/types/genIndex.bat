@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion
set "outputFile=index.json"
set "firstItem=true"

rem 清空或创建输出文件
if exist %outputFile% del %outputFile%

rem 添加结束的右方括号
echo ^[>>%outputFile%
rem 遍历当前目录下的.json文件，排除index.json
for %%f in (*.json) do (
    if /i "%%f" neq "%outputFile%" (
        rem 使用jq提取"name"字段的值
        for /f "delims=" %%j in ('jq -r ".name" "%%f"') do (
            rem 如果是第一个元素，不添加逗号
            if !firstItem! == true (
                set "firstItem=false"
            ) else (
                echo ^,>>%outputFile%
            )
            rem 构造JSON对象并追加到输出文件
            echo ^{"value":"%%~nf","name":"%%j"^}>>%outputFile%
        )
    )
)

rem 添加结束的右方括号
echo ^]>>%outputFile%

echo JSON array has been created: %outputFile%
endlocal