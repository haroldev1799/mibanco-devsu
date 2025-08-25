using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;
using ServicioMiBanco.Domain.Core.SeedWork;

namespace ServicioMiBanco.Domain.AggregatesModel.PersonAggregate
{
    public class Person : Entity, IAggregateRoot
    {
        public string name { get; private set; }
        public string gender { get; private set; }
        public int age { get; private set; }
        public string identification { get; private set; }
        public string address { get; private set; }
        public string phone { get; private set; }

        public Client Client { get; private set; }

        protected Person() { }

        public Person(string name, string gender, int age, string identification, string address, string phone, long? id = 0)
        {
            this.name = name;
            this.gender = gender;
            this.age = age;
            this.identification = identification;
            this.address = address;
            this.phone = phone;
            if (id > 0) {
                Id = (long)id;
            }
        }

        public void update(string name, string gender, int age, string identification, string address, string phone, long id)
        {
            this.name = name;
            this.gender = gender;
            this.age = age;
            this.identification = identification;
            this.address = address;
            this.phone = phone;
            this.Id = id;
        }
    }
}
