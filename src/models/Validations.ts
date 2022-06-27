class Validations{

    static validName = (name: string) => {
        var padraoNome = /^[a-zA-Z\u00C0-\u00FF ]*$/gi;
        let nome = name;
        console.log(padraoNome.test(nome));
    }
}

export default Validations;

