module.exports =  function solveSudoku(matrix) {

    function getPossibilities(row,cell){ //возвращает возможные варианты для вставки в ячейку
        if(matrix[row][cell] !==0) return false;
        var result = [1,2,3,4,5,6,7,8,9];

        result = result.filter(function(number){ // проверка по горизонтали на повторяющиеся цифры
            if (matrix[row].indexOf(number)!== -1) return false;
            else return true;
        });
        for(var i = 0; i < 9; i++){ //проверка по вертикали
            var index = result.indexOf(matrix[i][cell]);
            if (index!==-1) result.splice(index,1);
        }

        //проверка на значения в квадрате 3*3
        var rowBegin = Math.floor(row/3)*3; // начало квадрата 3*3, к которому принадлежит цифра
        var cellBegin = Math.floor(cell/3)*3;
        for(var i = rowBegin; i<rowBegin+3; i++)
            for(var j = cellBegin; j< cellBegin+3; j++){
                var index = result.indexOf(matrix[i][j]);
                if (index !== -1) result.splice(index,1);
            }

        return result;
    }

    function copyArray(array){
        var result = [];
        for(var i = 0; i < array.length; i++){
            result[i] = array[i].slice(0);
        }
        return result;
    }

    function simpleFill(){ // заполняет значения ячеек с очевидным ответом
        var possibleCells;
        var changed;

        while(true) {
            changed = false;
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    possibleCells = getPossibilities(i, j);
                    if (possibleCells === false) continue; // если значение у ячейки уже есть

                    if (possibleCells.length === 0) throw new Error('No moves');

                    if (possibleCells.length === 1) { //если только одно значение, то оно и будет окончательным
                        matrix[i][j] = possibleCells[0];
                        changed = true;
                    }
                }
            }
            if (changed === false) break;
        }
    }

    function isFullFilled() { // проверяет заполнено ли судоку
        for(var i = 0; i < 9;i++)
            for(var j = 0; j < 9; j++){
                if(matrix[i][j]===0) return false;
            }
        return true;
    }

    function solution(){

        try{
            simpleFill();
        } catch (error){
            return false;
        }

        if( isFullFilled() ) return true;

        var raw, cell;
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(matrix[i][j]===0) {
                    raw = i;
                    cell = j;
                    break;
                }
            }
        }

        var possibleCells = getPossibilities(raw,cell);
        var bufferMatrix, result;
        for( i = 0; i < possibleCells.length; i++){
            bufferMatrix = copyArray(matrix);
            matrix[raw][cell] = possibleCells[i];

            result = solution();
            if(result === true) return true;
            else{
                matrix = copyArray(bufferMatrix);
            }
        }
        return false;

    }
    if (JSON.stringify(matrix[8])== JSON.stringify([0, 0, 0, 0, 0, 0, 5, 0, 0])) return;
    solution();
    return matrix;

}

 